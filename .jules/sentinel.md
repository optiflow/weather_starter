## 2024-05-17 - Added basic security headers and JSON payload limits natively
**Vulnerability:** Missing basic security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) and unbounded JSON payload sizes which can lead to DoS.
**Learning:** Native Express middleware can be configured to provide basic security headers and JSON payload size limits without adding external dependencies like Helmet, which might have overly strict defaults (like CSP blocking external maps).
**Prevention:** Always ensure standard security headers are set and consider payload size limits as a base defense against simple DoS attacks.

## 2024-05-20 - Add native rate limiting to API endpoints
**Vulnerability:** Missing rate limiting on sensitive API endpoints, allowing potential DoS or brute force attacks.
**Learning:** Native Express middleware and a `Map` can be used to implement a lightweight rate limiter without external dependencies, suitable for simple protections against excessive requests from single IPs.
**Prevention:** Always consider applying basic rate limiting globally or on sensitive endpoints to prevent abuse and manage load.
