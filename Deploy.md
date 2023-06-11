# deploy application with e.g. with GPC - compute engine

- create compute engine

  - default debian will work
  - enable firewall http and https

- open ssh console

## install docker

- https://docs.docker.com/engine/install/debian/

> sudo apt-get update
> sudo apt-get install ca-certificates curl gnupg
>
> sudo install -m 0755 -d /etc/apt/keyrings
> curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
> sudo chmod a+r /etc/apt/keyrings/docker.gpg
>
> echo \
>  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
>  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
>  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
>
> sudo apt-get update
>
> sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
>
> # sudo docker run hello-world

## clone repo

- `git clone https://github.com/7frank/audio-foo.git`
- `cd audio-foo/`

## update environment variables

- `touch .env`
- `nano .env`

> PORT=80
> PROVIDERS_GOOGLE_CLIENT_ID=<insert-here>
> PROVIDERS_GOOGLE_CLIENT_SECRET=insert-here>
> SECRET=random-stuff
>
> # INSECURE_COOKIE=true # FIXME Example assumes no https, do not use in production
>
> LOG_LEVEL=debug

## install globals

- install nvm

  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
  - see output and take path of .bashrc for next command
  - `source /home/<your-user>/.bashrc`

- install npm

  - `nvm install 18`
  - `nvm alias default 16`
  - `nvm use 18`
  - `node -v`

- install pnpm

  - `npm i -g pnpm`

# install actual dependencies

- `pnpm i`

## start application

- `sudo docker compose up -d`

- run logs right afterwards if you so desire
  - `sudo docker compose logs --tail=0 --follow`

Note: you might have to follow registering a domainand enabling https first

# register domain "7frank.dev"

    - https://cloud.google.com/dns/docs/tutorials/create-domain-tutorial
      - [register a domain](https://domains.google.com/)
      - [create a dns zone](https://console.cloud.google.com/networking/dns/zones/~new?_ga=2.214516318.830896514.1686422795-466992886.1669232139)

> ns-cloud-a1.googledomains.com
> ns-cloud-a2.googledomains.com
> ns-cloud-a3.googledomains.com
> ns-cloud-a4.googledomains.com

`dig +trace 7frank.dev`
`nslookup 7frank.dev`
