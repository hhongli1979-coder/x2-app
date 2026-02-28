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
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
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

---

## 生活网站 (Life Platform)

X²-星链数字生态系统 includes a community classifieds platform ("生活网站") with region-based browsing (Europe 欧洲区 / Indonesia 印尼区), categories (租房, 二手, 招聘, 生活服务, 交友), post submission, and admin moderation. It is accessible at `/life`.

### Supabase Setup

1. **Create a project** at [supabase.com](https://supabase.com).

2. **Copy the project URL and anon key** from **Project Settings → API**.

3. **Create a `.env.local`** file (gitignored) and add:
   ```
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
   VITE_ADMIN_PASSWORD=choose_a_strong_password
   ```

4. **Run the schema migration** in the [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql):
   - Open `supabase/migrations/001_init.sql` and paste the content into the editor, then click **Run**.

5. **Seed initial data** (optional – categories are hardcoded in the frontend):
   ```sql
   -- Add yourself as admin (replace with your Supabase auth user UUID)
   INSERT INTO public.admins (user_id) VALUES ('YOUR_USER_UUID');
   ```

### Routes

| Path | Description |
|------|-------------|
| `/life` | Region selector (欧洲区 / 印尼区) |
| `/life/eu` | Europe region – post feed + search |
| `/life/id` | Indonesia region – post feed + search |
| `/life/:region/publish` | Submit a new post (pending moderation) |
| `/life/:region/post/:id` | Post detail page |
| `/life/admin` | Admin moderation panel (approve / reject / pin / delete) |

### Moderation Flow

1. A user submits a post → saved with `status = 'pending'`.
2. Admin visits `/life/admin`, enters the password, and approves/rejects the post.
3. Only `approved` posts appear in the public feed.

