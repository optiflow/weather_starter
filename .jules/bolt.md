
## 2024-05-23 - Concurrent API Execution with Rate Limits
**Learning:** Sequential network calls separated by artificial delays to avoid HTTP 429 rate limits drastically bloat execution time.
**Action:** When constrained by strict rate limits, use `Promise.all` with staggered delays (e.g., executing functions inside delayed thunks) to execute requests concurrently without triggering rate limits, improving overall throughput significantly.
