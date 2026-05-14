## 2024-05-14 - Security Headers and Payload Size
**Vulnerability:** Missing basic security headers and unrestricted JSON payload size.
**Learning:** Security headers (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection) need to be configured carefully due to the app's reliance on external map tiles, and JSON body parsers should have an explicit size limit to prevent DoS attacks.
**Prevention:** Implement basic headers natively and configure `express.json()` with an explicit `limit`.
