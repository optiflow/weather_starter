## 2026-05-24 - Rate Limiting via Sequential Execution Bottleneck
**Learning:** Sequential `await` execution with a sleep delay (to avoid HTTP 429 rate limits from `api-open.data.gov.sg`) caused a severe performance bottleneck in `getCurrentWeather`, taking ~25 seconds to complete the full payload fetch.
**Action:** Replaced sequential awaits with `Promise.all` using a staggered delay strategy (e.g. 0ms, 200ms, 400ms). This fetches the required data concurrently while spacing out requests to respect the rate limit, reducing fetch time to ~3-5 seconds.
