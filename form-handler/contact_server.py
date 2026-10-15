"""
Contact form handler for the Triggerfish Interactive website.

A single-file Django app. It accepts the JSON POST sent by the contact form
in contact.html, validates it, and emails the enquiry to CONTACT_TO_EMAIL.

Run locally:
    DJANGO_DEBUG=1 python contact_server.py runserver 8000

Run in production (WSGI):
    gunicorn contact_server:application

All configuration comes from environment variables, or a .env file beside this
script; see .env.example.
"""

import json
import logging
import os
import sys
import time
from email.utils import formataddr

from django.conf import settings


def load_dotenv(path=os.path.join(os.path.dirname(os.path.abspath(__file__)), '.env')):
    """Read KEY=VALUE lines from .env beside this file. Real environment variables win."""
    if not os.path.exists(path):
        return
    with open(path, encoding='utf-8') as fh:
        for line in fh:
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            key, value = line.split('=', 1)
            os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


load_dotenv()


def env(name, default=''):
    return os.environ.get(name, default).strip()


def env_bool(name, default=False):
    value = env(name)
    return value.lower() in {'1', 'true', 'yes', 'on'} if value else default


def env_list(name, default=''):
    return [item.strip() for item in env(name, default).split(',') if item.strip()]


DEBUG = env_bool('DJANGO_DEBUG')
SECRET_KEY = env('DJANGO_SECRET_KEY') or ('dev-only-insecure-key' if DEBUG else '')
if not SECRET_KEY:
    sys.exit('DJANGO_SECRET_KEY must be set (or DJANGO_DEBUG=1 for local development).')

EMAIL_HOST_USER = env('EMAIL_HOST_USER')
if EMAIL_HOST_USER:
    EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
elif DEBUG:
    # No SMTP account configured: print emails to the terminal instead.
    EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
else:
    sys.exit('EMAIL_HOST_USER and EMAIL_HOST_PASSWORD must be set to send email.')

if not settings.configured:
    settings.configure(
        DEBUG=DEBUG,
        SECRET_KEY=SECRET_KEY,
        ALLOWED_HOSTS=env_list('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1'),
        ROOT_URLCONF=__name__,
        INSTALLED_APPS=[],
        MIDDLEWARE=[
            'django.middleware.security.SecurityMiddleware',
            'django.middleware.common.CommonMiddleware',
            'django.middleware.clickjacking.XFrameOptionsMiddleware',
        ],
        USE_TZ=True,
        # Enquiries are small; refuse anything large before parsing it.
        DATA_UPLOAD_MAX_MEMORY_SIZE=64 * 1024,
        CACHES={'default': {'BACKEND': 'django.core.cache.backends.locmem.LocMemCache'}},
        EMAIL_BACKEND=EMAIL_BACKEND,
        EMAIL_HOST=env('EMAIL_HOST', 'smtp.gmail.com'),
        EMAIL_PORT=int(env('EMAIL_PORT', '587')),
        EMAIL_HOST_USER=EMAIL_HOST_USER,
        EMAIL_HOST_PASSWORD=env('EMAIL_HOST_PASSWORD'),
        EMAIL_USE_TLS=env_bool('EMAIL_USE_TLS', True),
        EMAIL_TIMEOUT=15,
        DEFAULT_FROM_EMAIL=env('DEFAULT_FROM_EMAIL') or EMAIL_HOST_USER or 'webmaster@localhost',
        SECURE_PROXY_SSL_HEADER=('HTTP_X_FORWARDED_PROTO', 'https') if env_bool('BEHIND_PROXY') else None,
        SECURE_SSL_REDIRECT=env_bool('SECURE_SSL_REDIRECT'),
        SECURE_HSTS_SECONDS=int(env('SECURE_HSTS_SECONDS', '0')),
        # The endpoint uses no cookies or sessions, so CSRF middleware has nothing to protect.
        SILENCED_SYSTEM_CHECKS=['security.W003'],
        LOGGING={
            'version': 1,
            'disable_existing_loggers': False,
            'handlers': {'console': {'class': 'logging.StreamHandler'}},
            'loggers': {'contact': {'handlers': ['console'], 'level': 'INFO', 'propagate': False}},
            'root': {'handlers': ['console'], 'level': 'WARNING'},
        },
    )

import django  # noqa: E402

django.setup()

from django.core.cache import cache  # noqa: E402
from django.core.exceptions import ValidationError  # noqa: E402
from django.core.mail import EmailMessage  # noqa: E402
from django.core.validators import validate_email  # noqa: E402
from django.http import HttpResponse, JsonResponse  # noqa: E402
from django.urls import path  # noqa: E402
from django.views.decorators.csrf import csrf_exempt  # noqa: E402

log = logging.getLogger('contact')

CONTACT_TO_EMAIL = env('CONTACT_TO_EMAIL', 'tfishapps@gmail.com')
ALLOWED_ORIGINS = set(env_list('CORS_ALLOWED_ORIGINS', 'http://localhost:8765,http://localhost:8000'))
RATE_LIMIT = int(env('RATE_LIMIT_PER_HOUR', '5'))
TRUST_X_FORWARDED_FOR = env_bool('BEHIND_PROXY')

# field: (max length, required, single line)
FIELDS = {
    'name': (200, True, True),
    'email': (254, True, True),
    'company': (200, False, True),
    'services': (300, False, True),
    'budget': (100, False, True),
    'timeline': (100, False, True),
    'message': (5000, True, False),
}
LABELS = {'name': 'Name', 'email': 'Email', 'company': 'Company', 'services': 'Services',
          'budget': 'Budget', 'timeline': 'Timeline', 'message': 'Message'}


def cors(response, origin):
    if origin in ALLOWED_ORIGINS:
        response['Access-Control-Allow-Origin'] = origin
        response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Accept'
        response['Access-Control-Max-Age'] = '86400'
        response['Vary'] = 'Origin'
    return response


def client_ip(request):
    if TRUST_X_FORWARDED_FOR and request.META.get('HTTP_X_FORWARDED_FOR'):
        return request.META['HTTP_X_FORWARDED_FOR'].split(',')[0].strip()
    return request.META.get('REMOTE_ADDR', 'unknown')


def rate_limited(ip):
    """Allow RATE_LIMIT messages per IP per rolling hour (per server process)."""
    key = f'contact-rate:{ip}'
    now = time.time()
    hits = [t for t in cache.get(key, []) if now - t < 3600]
    if len(hits) >= RATE_LIMIT:
        return True
    cache.set(key, hits + [now], 3600)
    return False


def parse_body(request):
    if request.content_type == 'application/json':
        data = json.loads(request.body or b'{}')
        if not isinstance(data, dict):
            raise ValueError('JSON body must be an object')
        return data
    return {key: ', '.join(request.POST.getlist(key)) for key in request.POST}


def clean(data):
    cleaned, errors = {}, {}
    for field, (max_len, required, single_line) in FIELDS.items():
        value = data.get(field, '')
        if isinstance(value, list):
            value = ', '.join(str(v) for v in value)
        value = str(value).strip()
        if single_line:
            value = ' '.join(value.split())  # also strips CR/LF, preventing header injection
        if required and not value:
            errors[field] = 'This field is required.'
        elif len(value) > max_len:
            errors[field] = f'Please keep this under {max_len} characters.'
        cleaned[field] = value
    if 'email' not in errors:
        try:
            validate_email(cleaned['email'])
        except ValidationError:
            errors['email'] = 'Please enter a valid email address.'
    return cleaned, errors


def build_email(form, ip):
    lines = [f'{LABELS[f]}: {form[f]}' for f in FIELDS if f != 'message' and form[f]]
    body = '\n'.join(lines) + f"\n\nMessage:\n{form['message']}\n\n--\nSent from the triggerfish website contact form ({ip})."
    return EmailMessage(
        subject=f"New project enquiry from {form['name']}"[:150],
        body=body,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[CONTACT_TO_EMAIL],
        reply_to=[formataddr((form['name'], form['email']))],
    )


@csrf_exempt  # cross-origin JSON API: protected by the origin allow-list, honeypot and rate limit instead
def contact(request):
    origin = request.headers.get('Origin', '')

    if request.method == 'OPTIONS':
        status = 204 if origin in ALLOWED_ORIGINS else 403
        return cors(HttpResponse(status=status), origin)
    if request.method != 'POST':
        return cors(JsonResponse({'ok': False, 'error': 'Method not allowed.'}, status=405), origin)
    # Browsers always send Origin on cross-site POSTs; reject pages we don't know.
    if origin and origin not in ALLOWED_ORIGINS:
        return JsonResponse({'ok': False, 'error': 'Origin not allowed.'}, status=403)

    try:
        data = parse_body(request)
    except (ValueError, UnicodeDecodeError):
        return cors(JsonResponse({'ok': False, 'error': 'Invalid request body.'}, status=400), origin)

    # Honeypot: real visitors never see this field. Pretend success so bots move on.
    if str(data.get('website', '')).strip():
        log.info('Honeypot triggered; message discarded.')
        return cors(JsonResponse({'ok': True}), origin)

    form, errors = clean(data)
    if errors:
        return cors(JsonResponse({'ok': False, 'errors': errors}, status=400), origin)

    ip = client_ip(request)
    if rate_limited(ip):
        return cors(JsonResponse({'ok': False, 'error': 'Too many messages. Please try again later.'}, status=429), origin)

    try:
        build_email(form, ip).send(fail_silently=False)
    except Exception:
        log.exception('Failed to send contact email')
        return cors(JsonResponse({'ok': False, 'error': 'Could not send your message right now.'}, status=502), origin)

    log.info('Contact enquiry sent for %s', form['email'])
    return cors(JsonResponse({'ok': True}), origin)


def health(request):
    return JsonResponse({'status': 'ok'})


urlpatterns = [
    path('', health),
    path('contact/', contact),
]

from django.core.wsgi import get_wsgi_application  # noqa: E402

application = get_wsgi_application()

if __name__ == '__main__':
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
