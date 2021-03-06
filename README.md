## Overview
![overview](media/gorae-pipe.png)

### Build Docker Image
```
$ npm run docker:build
```

### How to connect with github webhook

1. build `gorae-github-pipe` image
2. get the auto generated ssh-key of `gorae-github-pipe` during build
  - or http://[GORAE REGISTRY HOST:PORT]/#/settings/sshkey
3. register ssh-key on [github](https://github.com/settings/ssh)
4. run the `gorae-github-pipe` with some environment variables below
5. setting the webhook in github repository
  - Payload URL: http://[GORAE REGISTRY HOST:PORT]/webhook
  - Content Type: `application/json`
  - Trigger: `Just the push event`
  - Active

```
```

### How to run on local

```
$ npm install
$ PORT=8084 \
  GITHUB_SECRET=WEBHOOK-SECRET-KEY \
  REGISTRY_HOST=192.168.99.109 \
  REGISTRY_PORT=5000 \
  npm start
```

### Issue with private docker registry

- http://stackoverflow.com/questions/38695515/can-not-pull-push-images-after-update-docker-to-1-12
- https://forums.docker.com/t/how-to-run-a-insecure-registry/9692/15
- http://stackoverflow.com/questions/37619277/docker-mac-beta-using-insecure-private-registry
