### Build Docker Image
```
$ npm run docker:build
```

### How to connect with github webhook

1. build `gorae-github-pipe` image
2. get the auto generated ssh-key of `gorae-github-pipe` during build
3. register ssh-key on github
4. run the `gorae-github-pipe` with some environment variables below

```
```

### How to run on local

```
$ npm install
$ PORT=7777 \
  SECRET="WEBHOOK-SECRET-KEY" \
  REGISTRY_HOST=registry \
  REGISTRY_PORT=5000 \
  npm start
```

### Issue with private docker registry

- http://stackoverflow.com/questions/38695515/can-not-pull-push-images-after-update-docker-to-1-12
- https://forums.docker.com/t/how-to-run-a-insecure-registry/9692/15
- http://stackoverflow.com/questions/37619277/docker-mac-beta-using-insecure-private-registry
