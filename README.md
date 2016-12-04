
### How to run on local

```
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
