const clone = require('git-clone')

module.exports = (repo, target) => {
  return new Promise((resolve, reject) => {
    clone(repo, target, {shallow: true}, err => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })
}
