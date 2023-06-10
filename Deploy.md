# deploy application with e.g. with GPC - compute engine

- create compute engine

  - default debian will work
  - enable firewall http and https

- open ssh console

- install docker
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

- clone repo

  - `git clone https://github.com/7frank/audio-foo.git`
  - `cd audio-foo/`

- update environment variables
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

- run application
  - `docker compose up`
