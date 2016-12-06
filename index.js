const http = require('http')
const express = require('express')
const path = require('path')
const displayRoutes = require('express-routemap')

const webhook = require('./routes/webhook')

const PORT = process.env.PORT || 7777

const app = express()
app.use(express.static(path.join(__dirname, '..', 'www')))

app.use('/webhook', webhook)

http.createServer(app).listen(PORT, () => {
  displayRoutes(app)
})
