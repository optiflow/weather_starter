## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-18 - Implement rate limiting natively
**Vulnerability:** Missing rate limiting on API endpoints, which can lead to brute force, credential stuffing and DoS attacks.
**Learning:** We can implement basic in-memory rate limiting directly as Express middleware without adding external dependencies such as express-rate-limit.
**Prevention:** Always add rate limits to API endpoints, especially for authentication or high load paths, to prevent abuse.
