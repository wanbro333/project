# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A DeepSeek API balance checker delivered as three artifacts from one codebase: a PWA (`index.html`), a standalone HTML file (`deepseek-balance.html`), and an Android APK. The app queries `GET https://api.deepseek.com/user/balance` every 30 seconds, displaying total / granted / topped-up balance with a countdown timer. DeepSeek API supports CORS (echoes `Origin` header), so direct browser calls work without a proxy.

## Commands

```bash
npm start                   # Start Express server on port 3000 (static files + API proxy + QR page + APK download)
```

**Android APK build** (requires JDK 17 at `C:\Android\jdk17\jdk-17.0.19+10` and Android SDK at `C:\Android`):
```bash
cd android-app
set JAVA_HOME=C:\Android\jdk17\jdk-17.0.19+10
gradlew assembleDebug      # Output: app/build/outputs/apk/debug/app-debug.apk
```

## Architecture

### Delivery paths

| Artifact | Entry point | API call path | Requires server? |
|----------|------------|---------------|------------------|
| PWA | `index.html` → `http://<ip>:3000` | `/api/balance` (proxy) then direct | Yes (for initial load) |
| Standalone HTML | `deepseek-balance.html` | Direct to `api.deepseek.com` | No — open directly on phone |
| Android APK | `android-app/` — WebView loads `assets/index.html` | Direct to `api.deepseek.com` | No |

### Server (`server.js`)

Express app, three routes beyond static file serving:
- **`GET /api/balance`** — proxies to DeepSeek API, forwarding the `Authorization` header. Returns the upstream status and body unchanged. Catches network errors as 502.
- **`GET /qr`** — serves an inline HTML page with a QR code (uses `qrcodejs` from CDN) encoding `http://<local-IP>:3000`, plus an APK download link.
- **`GET /download`** — streams `DeepSeek-Balance.apk` as a file download.

Auto-detects local network IP via `os.networkInterfaces()` and prints it at startup.

### Web frontends (both `index.html` and `deepseek-balance.html`)

Single-file, no framework. Dark theme (#0d1117). Three rendering states:

1. **No key** — prompts user to paste API key (stored in `localStorage` under `deepseek_api_key`)
2. **Loading** — spinner while fetching
3. **Data** — balance card (with number animation), API status badge, countdown card, timer ring
4. **Error** — classified as `auth` (401 → "认证失败" + reset-key button), `network` (CORS/timeout → "网络错误" + hint to run server), or generic API error

`index.html` tries proxy URL first (`/api/balance`), then direct API. `deepseek-balance.html` uses direct API only. Both handle the same error taxonomy.

### Android APK (`android-app/`)

Minimal Android project — a single `Activity` that creates a `WebView` and loads `file:///android_asset/index.html` (a copy of `deepseek-balance.html`). JavaScript and DOM storage enabled. No native-Kotlin bridge or plugins — entirely a WebView wrapper.

- `minSdk 24`, `targetSdk 34`, namespace `com.deepseek.balance`
- Debug builds signed with the default debug keystore
- Icon: generated `mipmap-*` PNGs (blue circle on dark background)

### PWA support (`manifest.json`, `sw.js`)

`manifest.json` enables "Add to Home Screen" with standalone display mode. `sw.js` caches `index.html` and `manifest.json` (cache-first), skips caching `api.deepseek.com` requests.

## Key technical details

- **CORS**: DeepSeek API returns `access-control-allow-origin` matching the request Origin. Direct `fetch` from any browser context (including `file://` and WebView) works.
- **API key validation**: checked client-side — must start with `sk-`. The actual auth check happens server-side on first API call.
- **Refresh timer**: 30-second countdown via `setInterval`. Clicking the refresh card resets the timer and fetches immediately.
- **The APK's `assets/index.html` is a copy of `deepseek-balance.html`** — when updating the app, rebuild the APK after changes to the HTML.
