const git = require('download-github-repo')
const path = require('path')

const tmp = path.join(process.cwd(), 'tmp')

module.exports = (repo) => {
  git(repo, path.join(tmp, repo), err => {
    if (err) {
      throw err
    }
    console.log('done')
  })
}
