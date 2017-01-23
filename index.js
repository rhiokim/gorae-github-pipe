const http = require('http')
const express = require('express')
const cors = require('cors')
const path = require('path')
const displayRoutes = require('express-routemap')

const pkg = require('./package.json')
const registry = require('./routes/registry')
const webhook = require('./routes/webhook')
const sshkey = require('./routes/sshkey')

const PORT = process.env.PORT || 8082

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'www')))

app.get('/', (req, res) => {
  res.send(`${pkg.name} v${pkg.version}`)
})

app.use('/registry', registry)
app.use('/webhook', webhook)
app.use('/sshkey', sshkey)

http.createServer(app).listen(PORT, () => {
  displayRoutes(app)

  console.log('start server localhost: %s', PORT)
})
