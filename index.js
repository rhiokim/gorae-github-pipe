const http = require('http')
const express = require('express')
const cors = require('cors')
const path = require('path')
const displayRoutes = require('express-routemap')

const registry = require('./routes/registry')
const webhook = require('./routes/webhook')

const PORT = process.env.PORT || 8082

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, '..', 'www')))

app.use('/registry', registry)
app.use('/webhook', webhook)

http.createServer(app).listen(PORT, () => {
  displayRoutes(app)
})
