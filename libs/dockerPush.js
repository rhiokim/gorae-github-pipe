const docker = require('./docker')
const dockerTag = require('./dockerTag')

module.exports = (repoTag, opts, cb) => {
  dockerTag(repoTag, opts, (err, newTag) => {
    if (err) {
      return
    }

    const image = docker.getImage(newTag)
    /**
     * image.push({registry}, cb, auth)
     * https://github.com/apocas/dockerode/blob/master/lib/image.js#L86
     */
    image.push({}, (err, stream) => {
      if (err) {
        console.log('push1 err', err)
        return
      }

      docker.modem.followProgress(stream, (err, output) => {
        if (err) {
          console.log('push2 err', err)
          return
        }
        console.log('finish', output)

        cb(err, output)
      }, event => {
        console.log('progress push', event)
      })
    })
  })
}
