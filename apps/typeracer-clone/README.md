# TypeRacer clone

... with some additional features

## deployment

### vercel

- currently we deploy to vercel for simplicity

### google social login

- also we use google social login. you need to provide some environment variables created from [google credentials api](https://console.cloud.google.com/apis/credentials)

  > PROVIDERS_GOOGLE_CLIENT_ID=
  > PROVIDERS_GOOGLE_CLIENT_SECRET=
  > SECRETSECRET=something-random

- there you will have to define the callback URL as well.
- for local development this is: `http://localhost:5173/auth/callback/google`

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
