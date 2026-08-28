# Microchip Technology x SpaceXAI

Password-protected customer leave-behind for Microchip Technology.

## Stack

- Next.js 15.5
- React 19
- Geist
- vGPU
- TypeScript
- App Router under `src/`

## Run locally

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Set `SITE_PASSWORD` in
`.env.local`. The checked-in example uses the shared preview password.

## Brand assets

The displayed horizontal wordmark was published by the
[official MicrochipTech organization](https://github.com/MicrochipTech/E-nose-BME680/commit/682ebdfdad11570cf477482e9a8ee2d1df0a743c).
It includes the symbol, name, and registration mark as one unit. The official
[Microchip logos page](https://www.microchip.com/en-us/about/legal-information/logos)
and its usage guide remain the source of truth.

The SpaceXAI wordmark is the existing template asset. The watercolor scenes are
original assets made for this leave-behind.

## Deploy

The intended production URL is
[microchip-grokbot.vercel.app](https://microchip-grokbot.vercel.app).

Set `SITE_PASSWORD` in the Vercel project before promoting a deployment. The
site is private and sends no-index directives.
