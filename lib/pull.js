const clone = require('git-clone')
const path = require('path')

const tmp = path.join(process.cwd(), 'tmp')

module.exports = (repo, target) => {
  clone(repo, path.join(tmp, target), () => {
    console.log('done')
  })
}
