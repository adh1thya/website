# Personal website

My personal website, with a live Discord presence card.
Built with Next.js, React and Tailwind CSS, and exported as a static site.

Discord presence powered by [Lanyard](https://github.com/phineas/lanyard)


## Setup

```bash
npm install
```

Create `.env.local`:

```
NEXT_PUBLIC_PRESENCE_URL=http://localhost:8000/presence
```

`NEXT_PUBLIC_PRESENCE_URL` is the presence endpoint the card fetches from. It's inlined at build time, so changing it requires a rebuild. If it's missing, the card is hidden.

## Development

```bash
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs a static site to `out/`. Preview it with `npx serve out`.

## Deployment

Hosted on Cloudflare Pages:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `out` |
| Environment variable | `NEXT_PUBLIC_PRESENCE_URL` |

## Editing content

Name, tagline, about text, stack and social links all live in `lib/data.ts`.