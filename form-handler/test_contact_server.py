"""
Tests for contact_server.py. Run from this folder with:
    DJANGO_DEBUG=1 python -m unittest -v
"""

import json
import os
import unittest
from unittest import mock

os.environ.setdefault('DJANGO_DEBUG', '1')
os.environ.setdefault('CORS_ALLOWED_ORIGINS', 'https://site.example')

import contact_server  # noqa: E402  (configures Django)
from django.core import mail  # noqa: E402
from django.core.cache import cache  # noqa: E402
from django.test import SimpleTestCase  # noqa: E402
from django.test.utils import setup_test_environment  # noqa: E402

ORIGIN = 'https://site.example'
VALID = {
    'name': 'Ada Lovelace',
    'email': 'ada@example.com',
    'company': 'Analytical Engines',
    'services': 'Website, WordPress',
    'budget': '$10k – $25k',
    'timeline': '1–3 months',
    'message': 'We need a new site.\nThanks!',
    'website': '',
}


def setUpModule():
    setup_test_environment()


class ContactTests(SimpleTestCase):
    def setUp(self):
        cache.clear()
        mail.outbox = []

    def post(self, data, origin=ORIGIN, **extra):
        headers = {'HTTP_ORIGIN': origin} if origin else {}
        return self.client.post('/contact/', json.dumps(data), content_type='application/json', **headers, **extra)

    def test_valid_submission_sends_email(self):
        res = self.post(VALID)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), {'ok': True})
        self.assertEqual(len(mail.outbox), 1)
        msg = mail.outbox[0]
        self.assertEqual(msg.to, ['tfishapps@gmail.com'])
        self.assertEqual(msg.reply_to, ['Ada Lovelace <ada@example.com>'])
        self.assertIn('Ada Lovelace', msg.subject)
        self.assertIn('Services: Website, WordPress', msg.body)
        self.assertIn('We need a new site.\nThanks!', msg.body)
        self.assertEqual(res['Access-Control-Allow-Origin'], ORIGIN)

    def test_missing_required_fields(self):
        res = self.post({'name': '', 'email': '', 'message': ''})
        self.assertEqual(res.status_code, 400)
        self.assertEqual(set(res.json()['errors']), {'name', 'email', 'message'})
        self.assertEqual(mail.outbox, [])

    def test_invalid_email(self):
        res = self.post({**VALID, 'email': 'not-an-email'})
        self.assertEqual(res.status_code, 400)
        self.assertIn('email', res.json()['errors'])

    def test_too_long_message(self):
        res = self.post({**VALID, 'message': 'x' * 5001})
        self.assertEqual(res.status_code, 400)
        self.assertIn('message', res.json()['errors'])

    def test_header_injection_is_neutralised(self):
        res = self.post({**VALID, 'name': 'Eve\r\nBcc: victim@example.com'})
        self.assertEqual(res.status_code, 200)
        msg = mail.outbox[0]
        self.assertNotIn('\n', msg.subject)
        self.assertEqual(msg.bcc, [])

    def test_name_with_comma_keeps_single_reply_to(self):
        self.post({**VALID, 'name': 'Lovelace, Ada'})
        self.assertEqual(len(mail.outbox[0].reply_to), 1)

    def test_honeypot_discards_silently(self):
        res = self.post({**VALID, 'website': 'http://spam.example'})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(mail.outbox, [])

    def test_disallowed_origin_rejected(self):
        res = self.post(VALID, origin='https://evil.example')
        self.assertEqual(res.status_code, 403)
        self.assertEqual(mail.outbox, [])

    def test_preflight(self):
        ok = self.client.options('/contact/', HTTP_ORIGIN=ORIGIN)
        self.assertEqual(ok.status_code, 204)
        self.assertEqual(ok['Access-Control-Allow-Origin'], ORIGIN)
        self.assertIn('POST', ok['Access-Control-Allow-Methods'])
        bad = self.client.options('/contact/', HTTP_ORIGIN='https://evil.example')
        self.assertEqual(bad.status_code, 403)
        self.assertFalse(bad.has_header('Access-Control-Allow-Origin'))

    def test_get_not_allowed(self):
        self.assertEqual(self.client.get('/contact/').status_code, 405)

    def test_rate_limit(self):
        for _ in range(contact_server.RATE_LIMIT):
            self.assertEqual(self.post(VALID).status_code, 200)
        self.assertEqual(self.post(VALID).status_code, 429)
        self.assertEqual(len(mail.outbox), contact_server.RATE_LIMIT)

    def test_form_encoded_body(self):
        res = self.client.post('/contact/', {'name': 'Ada', 'email': 'ada@example.com', 'message': 'Hi',
                                             'services': ['Website', 'WordPress']}, HTTP_ORIGIN=ORIGIN)
        self.assertEqual(res.status_code, 200)
        self.assertIn('Services: Website, WordPress', mail.outbox[0].body)

    def test_malformed_json(self):
        res = self.client.post('/contact/', '{nope', content_type='application/json', HTTP_ORIGIN=ORIGIN)
        self.assertEqual(res.status_code, 400)
        res = self.client.post('/contact/', '[1, 2]', content_type='application/json', HTTP_ORIGIN=ORIGIN)
        self.assertEqual(res.status_code, 400)

    def test_send_failure_returns_502(self):
        with mock.patch('django.core.mail.EmailMessage.send', side_effect=OSError('SMTP down')):
            with self.assertLogs('contact', level='ERROR'):
                res = self.post(VALID)
        self.assertEqual(res.status_code, 502)
        self.assertFalse(res.json()['ok'])

    def test_health(self):
        self.assertEqual(self.client.get('/').json(), {'status': 'ok'})


if __name__ == '__main__':
    unittest.main()
