const http = require('http')
const createHandler = require('github-webhook-handler')

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
  const {repository} = event.payload
  console.log(repository.ssh_url)
  pull(repository.ssh_url, repository.full_name)
})
