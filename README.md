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

## deploy

[see here](./Deploy.md)

## WIP

# try registering ssl certificate for `7frank.dev `

- https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs?hl=de
  - https://console.cloud.google.com/security/ccm/list/lbCertificates?hl=de&_ga=2.150438655.830896514.1686422795-466992886.1669232139
  - https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?hl=de&_ga=2.184979168.830896514.1686422795-466992886.1669232139
- Note but that would require setting up a load balancer via google and we as of now don't want that

## todo

### register certificate

- [see](/home/freimann/Projects/ai-book/provision-wordpress-on-aws.md)
- https://cloud.google.com/community/tutorials/nginx-reverse-proxy-docker
- https://letsencrypt.org/getting-started/

  > sudo apt install snapd
  > sudo snap install core; sudo snap refresh core
  > sudo snap install --classic certbot
  > sudo ln -s /snap/bin/certbot /usr/bin/certbot
  > "stop webserver at port 80 if any"
  > sudo certbot certonly --standalone
  > "follow instructions"

- https://doc.traefik.io/traefik/user-guides/docker-compose/acme-tls/

  - problem: self signed
  - solution wrong parameters [see](example.docker-compose.yaml)

- register static ip and assign to compute engine

  - problem ip currently dynamic > after restart dns record needs to be updated on cloud console
  - https://cloud.google.com/compute/docs/ip-addresses/reserve-static-external-ip-address?hl=de
  - update dns record (A)

## troubleshooting

- traefik-forward-auth seems to have problems with https -.-
  - https://github.com/traefik/traefik/issues/4972
- payment container seems broken when started on "compute engine"?
  - will slow down host
- isolate container and see what we can find

### stripe env variables

- test if we can remove the a record

- setup remote desktop
  - https://cloud.google.com/architecture/chrome-desktop-remote-on-compute-engine?hl=de
