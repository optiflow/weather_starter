## 2024-05-31 - [API Rate Limits & Concurrent Fetches]
**Learning:** Sequential execution of external API calls to avoid rate limits (e.g., HTTP 429 from `api-open.data.gov.sg`) creates a significant performance bottleneck (e.g., >10s delay).
**Action:** Use staggered concurrent execution (e.g., `Promise.all` with a delay thunk parameter) to maximize performance while respecting strict rate limits.
