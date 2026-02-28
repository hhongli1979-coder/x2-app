<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/569e2cd3-882f-428c-b055-4a06b2f72779

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. (Optional) Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key – if omitted, the app still starts but the AI chat feature will show a disabled notice
3. Run the app:
   `npm run dev`

## PWA (Progressive Web App)

The app ships with full PWA support powered by [vite-plugin-pwa](https://vite-pwa-org.netlify.app/).

### Features

- **Installable** – Chrome/Edge/Safari show an "Install app" prompt on desktop and mobile.
- **Offline fallback** – The service worker caches the app shell and returns `/offline.html` when navigation fails without a network connection.
- **Caching** – Google Fonts are cached with a CacheFirst strategy (1 year TTL).
- **Manifest** – A `manifest.webmanifest` is auto-generated with name, icons, theme colour, and display mode.
- **iOS support** – `apple-touch-icon`, `apple-mobile-web-app-capable`, and status-bar meta tags are included.

### Testing PWA locally

1. **Build** the production bundle (service workers are only registered in production):
   ```bash
   npm run build
   npm run preview
   ```
   The preview server starts at `http://localhost:4173`.

2. **Install prompt** – Open `http://localhost:4173` in Chrome. The address bar shows an install icon (⊕) – click it to install the app.

3. **Offline fallback** – In Chrome DevTools → Network tab, tick **Offline** and navigate to any URL. You should see the branded offline page instead of the browser's default error page.

4. **Lighthouse** – In Chrome DevTools → Lighthouse, run a **PWA** audit. All core PWA checks should pass.

5. **On a real device** – Deploy or use `ngrok` to expose the preview over HTTPS (required for service workers on device). Then open the URL in Chrome for Android or Safari on iOS and use "Add to Home Screen".

### Icons

Placeholder SVG icons are provided in `public/`:

| File | Size | Usage |
|------|------|-------|
| `icon-192.svg` | 192×192 | Android / Manifest |
| `icon-512.svg` | 512×512 | Android / Manifest |
| `apple-touch-icon.svg` | 180×180 | iOS Home Screen |

Replace these files with production-quality PNG/WebP artwork when ready.

