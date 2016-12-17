const fs = require('fs')
const express = require('express')

const router = express.Router()
const key = '/root/.ssh/id_rsa.pub'

router.get('/', (req, res) => {
  const is = fs.existsSync(key)
  const rsaPub = is ? fs.readFileSync(key, 'utf8') : 'non-exist'
  res.send(rsaPub)
})

module.exports = router
