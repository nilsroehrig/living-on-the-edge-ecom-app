# Svekom

Companion app for my talk "Living on the Edge - Web-Apps mit SvelteKit und Cloudflare Pages"

## Todos

- [x] Startpage
- [x] Product Detail Page
- [x] Category Page
- [x] Add-to-Cart
- [x] Local Persistence for Cart (e.g. LocalStorage)
- [x] Cart Overview
- [x] Handle amount on cart overview
- [ ] Build for Cloudflare
- [ ] Adapt products and categories to Workers KV
- [ ] Use Durable Objects for Cart

# Optional for Meetup
- [ ] Desktop Styling
- [ ] Simple Checkout Flow
- [ ] Use Services everywhere

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
