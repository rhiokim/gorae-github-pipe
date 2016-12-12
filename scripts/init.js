/* global emit */
const PouchDB = require('pouchdb')
const mkdirp = require('mkdirp')

mkdirp('.storage')

const db = new PouchDB('.storage/gorae')

const ddoc = {
  _id: '_design/image',
  views: {
    all: {
      map: function (doc) {
        emit(doc.id, null)
      }.toString()
    }
  }
}

console.log('postinstall')
console.log('setup default design doc into leveldb')

db.put(ddoc).then(() => {
  console.log('success ddoc')
}).catch(err => {
  console.log('%s %s', err.message, ddoc._id)
})
