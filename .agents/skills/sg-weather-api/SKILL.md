---
name: sg-weather-api
description: Singapore data.gov.sg weather API reference - endpoints, response shapes, and usage patterns for the weather starter app.
---

# Singapore Weather API

Use this skill when changing `backend/src/weather.ts`, adding weather metrics, building area pickers, or debugging provider response handling.

Base URL: https://api-open.data.gov.sg

## 2-Hour Forecast (used in this app)

- GET /v2/real-time/api/two-hr-forecast
- Area-based forecasts grouped by named areas
- Returns area metadata and per-area conditions
- Important fields:
  - `data.area_metadata[].name`
  - `data.area_metadata[].label_location.latitude`
  - `data.area_metadata[].label_location.longitude`
  - `data.items[0].forecasts[].area`
  - `data.items[0].forecasts[].forecast`
- Use nearest area metadata coordinates to map arbitrary Singapore coordinates to a forecast area.

## Realtime Station Readings

- GET /v2/real-time/api/air-temperature
- GET /v2/real-time/api/relative-humidity
- GET /v2/real-time/api/rainfall
- GET /v2/real-time/api/wind-speed
- GET /v2/real-time/api/wind-direction
- Response pattern:
  - `data.stations[]` has station `id`, `name`, and `location`.
  - `data.readings[0].data[]` has `stationId` and `value`.
  - Match the nearest station to the saved location, then read the matching `stationId`.
- Units used by the app:
  - Temperature: Celsius.
  - Humidity: percent.
  - Rainfall: millimeters.
  - Wind speed: knots.
  - Wind direction: degrees.

## Extended Forecasts

- GET /v2/real-time/api/twenty-four-hr-forecast
  - Current app code uses this for hourly/period forecasts.
  - Region keys are lower-case names such as `central`, `east`, `north`, `south`, and `west`.
- GET /v1/environment/4-day-weather-forecast
  - Returns daily forecast text and temperature ranges.
  - The shape differs from v2 real-time endpoints; do not reuse v2 parsing assumptions.

## Air Quality And UV

- GET /v2/real-time/api/uv
  - Use the latest `data.records[0].index[0].value`.
- GET /v2/real-time/api/psi
  - Use regional readings such as `psi_twenty_four_hourly`.
- GET /v2/real-time/api/pm25
  - Use regional readings such as `pm25_one_hourly`.

## Error Handling

- If a payload has a non-zero `code`, throw `WeatherProviderError` with `errorMsg` when present.
- Provider calls may partially fail. `getCurrentWeather` should keep useful fulfilled values and leave unavailable metrics as `null` where possible.
- Preserve `observed_at` as the latest timestamp across fulfilled provider responses.

## Implementation Notes

- Use `WEATHER_API_KEY` when present, but keep basic development working without one.
- Keep provider-specific parsing inside `backend/src/weather.ts`.
- Avoid frontend calls directly to `api-open.data.gov.sg`; the backend owns provider access and normalization.
