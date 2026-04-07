<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Monster Dash

This repo contains the current source-of-truth gameplay app for Monster Dash.

View your app in AI Studio: https://ai.studio/apps/eedb9dd6-e540-48d0-ac83-57ce1723647f

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Deploy To Vercel

This app is configured as a static Vite deploy.

Files:
- `vercel.json`
- `vite.config.ts`

Recommended deploy flow:

1. Push this repo to GitHub
2. In Vercel, create a new project from `thetangstr/monster_dash`
3. Framework preset: `Vite`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy

No runtime secrets are required for deployment.

## Notes

- The old Gemini API key wiring was removed because this app does not use Gemini at runtime.
- This repo is now safe to deploy as a static browser app on Vercel.
