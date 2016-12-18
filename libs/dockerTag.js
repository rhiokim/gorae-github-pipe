const docker = require('./docker')

const REGISTRY_HOST = process.env.REGISTRY_HOST || 'localhost'
const REGISTRY_PORT = process.env.REGISTRY_PORT || 5000

module.exports = (repoTag, opts, cb) => {
  opts = Object.assign({}, opts || {})

  const image = docker.getImage(repoTag)
  const newTag = `${REGISTRY_HOST}:${REGISTRY_PORT}/${repoTag}`

  console.log('tag', repoTag, newTag)

  image.tag({
    repo: newTag
  }, err => {
    console.log('tag err', err)
    cb(err, newTag)
  })
}
