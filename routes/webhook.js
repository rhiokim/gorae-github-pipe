const path = require('path')
const rimraf = require('rimraf')
const express = require('express')
const createHandler = require('github-webhook-handler')
// const dockerBuild = require('docker-build')
const dockerBuild = require('../libs/dockerBuild')
// const dockerPush = require('docker-push')
const dockerPush = require('../libs/dockerPush')

const db = require('../libs/db')
const pull = require('../libs/pull')
const SECRET = process.env.GITHUB_SECRET || process.argv[2] || ''

const handler = createHandler({ path: '/', secret: SECRET })
const router = express.Router()

router.all('/*', (req, res) => {
  handler(req, res, err => {
    if (err) {
      res.statusCode = 404
      res.end('no such location')
      return
    }
  })
})

handler.on('error', err => {
  console.error('Error:', err.message)
})

handler.on('ping', event => {
  console.log('ping success')
  console.log('ping id: %s', event.id)
})

handler.on('push', event => {
  const {repository, head_commit} = event.payload
  const target = path.join(process.cwd(), 'tmp', repository.full_name, head_commit.id)
  const repoTag = repository.full_name

  rimraf.sync(target)

  pull(repository.ssh_url, target)
    .then(() => {
      dockerBuild(repoTag, target, () => {
        console.log('built')
        dockerPush(repoTag, {tag: 'v0.0.1'}, () => {})
      })
      // dockerBuild(repository.full_name, target, () => {
      //   dockerPush(repository.full_name, `${REGISTRY_HOST}:${REGISTRY_PORT}/${repository.full_name}`, () => {
      //     console.log('done')
      //   })
      // })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = router
