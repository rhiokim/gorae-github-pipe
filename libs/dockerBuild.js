const tar = require('tar-fs')
const docker = require('./docker')

module.exports = (name, target, cb) => {
  const tarStream = tar.pack(target)

  docker.buildImage(tarStream, {
    t: name
  }, (err, stream) => {
    if (err) {
      console.log('build err', err)
      return
    }

    docker.modem.followProgress(stream, (err, output) => {
      if (err) {
        console.log('build finish err', err)
        return
      }

      cb()
    }, event => {
      console.log('building', event)
    })
  })
}
