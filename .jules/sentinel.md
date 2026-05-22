## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-22 - Add native rate limiting to API endpoints
**Vulnerability:** Missing rate limiting on API endpoints, which can lead to DoS attacks and excessive consumption of resources (e.g., downstream external APIs limits being exceeded).
**Learning:** Native Express mechanism (in-memory Map) can provide an effective rate limiting without relying on external dependencies like `express-rate-limit`. `.unref()` must be used on background timers (like Map cleanup intervals) to prevent test suites from hanging.
**Prevention:** Implement rate limiting on publicly accessible endpoints, especially those reaching out to third-party services, while taking care not to interfere with the application's test lifecycle by unreferencing long-running background tasks.
