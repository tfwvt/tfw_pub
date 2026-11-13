# Contact form handler

A small Django app that receives the website's contact form and emails each enquiry to **tfishapps@gmail.com**. The visitor's address is set as Reply-To, so you can reply straight from Gmail.

Everything lives in `contact_server.py`, a single-file Django project. It has no database, no admin and no templates.

## How it fits together

The website is static, so it can't send email itself. `contact.html` posts the form as JSON to this app's `/contact/` URL, and the app:

1. Accepts requests only from the site origins listed in `CORS_ALLOWED_ORIGINS`
2. Silently drops submissions that fill the hidden `website` honeypot field
3. Validates name, email and message (required) and the optional fields, with length limits
4. Rate-limits each visitor IP (5 per hour by default)
5. Sends the email over SMTP and returns `{"ok": true}`, or a 400, 429 or 502 with `{"ok": false, ...}`

The site's JavaScript already shows the matching success and error messages.

## Run locally

```sh
cd form-handler
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
DJANGO_DEBUG=1 python contact_server.py runserver 8000
```

With `DJANGO_DEBUG=1` and no `EMAIL_HOST_USER` set, emails are printed to the terminal instead of being sent. To try the real form, serve the site (`python3 -m http.server 8765` from the repo root) and set `data-endpoint="http://localhost:8000/contact/"` on the form in `contact.html`.

Run the tests:

```sh
DJANGO_DEBUG=1 python -m unittest -v
```

## Deploy

Run it on any host that supports Python, such as Render, Railway, Fly.io, PythonAnywhere or a VPS. **GitHub Pages can't run it**: it only serves static files.

1. Copy `.env.example` to `.env`, or set the same variables in your host's dashboard:
   - `DJANGO_SECRET_KEY`: a long random string
   - `DJANGO_ALLOWED_HOSTS`: the handler's own hostname
   - `CORS_ALLOWED_ORIGINS`: the website's address(es), such as `https://tfish.net`
   - `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD`: the Gmail account and a Google **App Password** (needs 2-Step Verification; a normal password won't work)
2. Start command: `gunicorn contact_server:application --chdir form-handler`
3. In `contact.html`, set the form's endpoint to the deployed URL:
   ```html
   <form id="contact-form" ... data-endpoint="https://YOUR-HANDLER-HOST/contact/">
   ```

Check it's up: `GET /` returns `{"status": "ok"}`.

## Notes

- **Rate limit:** the rate limit is kept in memory, per server process. That's fine for a small site. Run a single worker, or switch `CACHES` to Redis if you scale out.
- **Secrets:** never commit `.env`; it's in `.gitignore`. If this repo is published with GitHub Pages, this folder's source is publicly visible, which is fine because secrets only live in the environment.
- **HTTPS settings:** `python contact_server.py check --deploy` still flags `SECURE_HSTS_INCLUDE_SUBDOMAINS` and `SECURE_HSTS_PRELOAD`. Those are domain-wide decisions, so they're left off.
