const clone = require('git-clone')
const path = require('path')

const tmp = path.join(process.cwd(), 'tmp')

module.exports = (repo, target, commit) => {
  const dir = path.join(tmp, target, commit)
  return new Promise((resolve, reject) => {
    clone(repo, dir, {shallow: true}, err => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })
  })
}
