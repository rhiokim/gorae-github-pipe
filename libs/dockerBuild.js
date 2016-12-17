const Docker = require('dockerode')
const tar = require('tar-fs')

const docker = new Docker({
  socketPath: '/var/run/docker.sock'
})

module.exports = (name, target, cb) => {
  const tarStream = tar.pack(target)

  docker.buildImage(tarStream, {
    t: name
  }, cb)
}
