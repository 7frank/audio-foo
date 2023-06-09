# what is this?

- WIP -

This is somewhat of an audio tool, that extracts certain instruments from a song

Until now it slices the first 5 seconds of a song and runs the result through the extraction process

## user stories

- As a customer I want to test the website with reduced functionality before i buy anything, to find out if this is useful for me

- As customer I do not want to register but login with google facebook or github, because registration is tedious
- As a entrepreneur I need a simple setup to let my user pay for additional functionality
- As entrepreneur i want to have a bare bone application that provides
  - authn
  - payment
  - payment2authz
  - canceling subscriptions => revoke AuthZ

# technical overview / TODO

The idea is to have a modular application.

- behind a reverse proxy "traefik"
  - Note:https://chat.openai.com/c/78b14b35-f3d5-4770-a6cd-09988a221019
- a AuthN traefik middleware
  - https://github.com/thomseddon/traefik-forward-auth/wiki/Provider-Setup
- a potential stripe traefik middleware / or module (currently payment-module)
- a mechanism that assigns or revokes privileges to sso users based on subscription
  - stripe products can contain metadata, a field roles/privileges could be added whose content would allow to set roles/privileges
    - Note: this does not work for payment intents for subscriptions as metadata is not allowed there atm (mai/23)
- encrypt relevant keys
  - maybe use mozilla SOPS https://poweruser.blog/how-to-encrypt-secrets-in-config-files-1dbb794f7352
  - or "npm senv"

# how to

## setup OAuth providers

- [add the correct .env variables for your provider](https://hub.docker.com/r/thomseddon/traefik-forward-auth#configuration)
  - if they where wrong docker-compose will show errors that the middleware does not exist
- get credentials like id and secret
  - [e.g. for Google](https://github.com/thomseddon/traefik-forward-auth/wiki/Provider-Setup) and [Redirect URIs](https://github.com/thomseddon/traefik-forward-auth/wiki/Provider-Setup#redirect-uris)
    - > PROVIDERS_GOOGLE_CLIENT_ID=...
    - > PROVIDERS_GOOGLE_CLIENT_SECRET=...

## start the application

`pnpm i` & `docker-compose up --build`

goto `http://localhost` after you started the application
click on "uploads" in the naviation
