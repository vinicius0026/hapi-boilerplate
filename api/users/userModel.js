/*
  This is a fake implementation, with json + memory database stub, not suitable
  for use in production. Replace this with a real database connection and
  lookups and don't forget to critograph the users passwords and to remove
  sensitive data like salt and password hash when returning users from this file
*/

'use strict'

const internals = {}

internals.db = require('./users.json')

exports.getValidatedUser = function (username, password) {
  return new Promise((resolve, reject) => {
    const user = internals[username]

    if (!user) {
      return resolve()
    }

    // Replace this for a constant time criptographic comparison of passwords
    if (password === user.password) {
      // removing sensitive information from user object
      const _user = Object.assign({}, user)
      delete _user.password
      return resolve(user)
    }

    resolve()
  })
}
