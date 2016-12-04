const http = require('http')
const path = require('path')
const rimraf = require('rimraf')
const createHandler = require('github-webhook-handler')
const dockerBuild = require('docker-build')
const dockerPush = require('docker-push')

const pull = require('./lib/pull')
const PORT = process.env.PORT || 7777
const SECRET = process.env.SECRET || process.argv[2] || ''
const REGISTRY_HOST = process.env.REGISTRY_HOST || 'localhost'
const REGISTRY_PORT = process.env.REGISTRY_PORT || 5000

const handler = createHandler({ path: '/webhook', secret: SECRET })

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(PORT)

handler.on('error', err => {
  console.error('Error:', err.message)
})

handler.on('push', event => {
  const {repository, head_commit} = event.payload
  const target = path.join(process.cwd(), 'tmp', repository.full_name, head_commit.id)

  rimraf.sync(target)

  pull(repository.ssh_url, target)
    .then(() => {
      dockerBuild(repository.full_name, target, () => {
        dockerPush(repository.full_name, `${REGISTRY_HOST}:${REGISTRY_PORT}/${repository.full_name}`, () => {
          console.log('done')
        })
      })
    })
    .catch(err => {
      console.log(err)
    })
})
