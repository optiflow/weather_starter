## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-23 - Missing Rate Limiting on API Endpoints
**Vulnerability:** Missing rate limiting on the `/api` endpoints allowed arbitrary numbers of requests, leading to potential DoS or brute force attacks.
**Learning:** We can implement simple, native rate limiting in Express using an in-memory Map structure, and we must ensure that background intervals (like memory cleanup for rate limiting) call `.unref()` so they don't keep Node.js alive during tests.
**Prevention:** Consider implementing basic rate limiting for API endpoints natively in early project stages to prevent rapid abusive requests.
