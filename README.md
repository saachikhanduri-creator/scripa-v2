# Scripa · Trades

Voice documentation for trade technicians (HVAC/electrical/plumbing). Speak a job recap, get back a structured job/inspection report plus a client-ready plain-English summary — one AI call, two outputs.

Part of the Scripa family: one profession-specific voice-documentation product per vertical, same underlying engine (speak → structure → generate), modeled on voize / Heidi Health / Tandem Health.

**Live demo:** _add your Vercel URL here after deploying_

## What's in this repo

- `app/page.tsx` — mobile-first UI (record/type → review → generate → structured report + client summary)
- `app/api/generate/route.ts` — server-side API route that calls the Claude API with structured outputs
- `lib/prompt.ts` — system prompt + JSON schema for the trade job report
- `RESEARCH.md` — go-niche case for trades (market, ICP, willingness to pay, competitive scan)
- `ONE_PAGER.md` — positioning, ICP, pricing, GTM

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in **Chrome** (best support for the browser mic/speech-to-text). Requires an `ANTHROPIC_API_KEY` in `.env.local` (see `.env.example`).

## Deploy

Push to GitHub, import into [Vercel](https://vercel.com/new), and set the `ANTHROPIC_API_KEY` environment variable in the Vercel project settings.
