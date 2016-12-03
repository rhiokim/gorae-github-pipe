const http = require('http')
const path = require('path')
const rimraf = require('rimraf')
const createHandler = require('github-webhook-handler')
const dockerBuild = require('docker-build')

const pull = require('./lib/pull')
const port = process.env.PORT || 7777
const secret = process.env.SECRET || process.argv[2] || ''

const handler = createHandler({ path: '/webhook', secret: secret })

http.createServer((req, res) => {
  handler(req, res, err => {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(port)

handler.on('error', err => {
  console.error('Error:', err.message)
})

handler.on('push', event => {
  const {repository, head_commit} = event.payload
  const target = path.join(process.cwd(), 'tmp', repository.full_name, head_commit.id)
  rimraf.sync(target)
  pull(repository.ssh_url, target)
    .then(() => {
      dockerBuild('pipe', target)
    })
    .catch(err => {
      console.log(err)
    })
})
