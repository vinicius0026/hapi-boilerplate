/*
  This is a fake implementation, with json + memory database stub, not suitable
  for use in production. Replace this with a real database connection and
  lookups and don't forget to secure user's passwords and to remove
  sensitive data like salt and password hash when returning users from this file
*/

'use strict'

const Boom = require('boom')
const Joi = require('joi')

const internals = {}

internals.model = {
  id: Joi.number().min(0),
  username: Joi.string().min(3).max(50).description('User\'s username, used for login'),
  password: Joi.string().min(3).max(50).description('User\'s password, used for login'),
  scope: Joi.array().items(Joi.string().valid('user', 'admin'))
    .description('User\'s role, used for determining what the user will be able to do in the system')
}

module.exports = function (_di) {
  const di = _di || {}

  internals.db = require('./users.json')
  Object.assign(internals, di)

  return {
    getValidatedUser,
    model: internals.model,
    create,
    read,
    update,
    remove,
    list
  }
}

function create (data) {
  return new Promise((resolve, reject) => {
    // check for username duplication:
    if (internals.db.find(user => user.username === data.username)) {
      return reject(Boom.badRequest('Username already taken'))
    }

    const id = internals.db[internals.db.length - 1].id + 1

    const user = Object.assign({}, { id }, data)
    internals.db.push(user)
    resolve(user)
  })
}

function read (id) {
  return new Promise((resolve, reject) => {
    const user = internals.db.find(user => user.id === Number(id))

    if (!user) {
      return reject(Boom.notFound('User not found'))
    }

    const returnedUser = Object.assign({}, user, { password: undefined })

    resolve(returnedUser)
  })
}

function update (id, data) {
  return new Promise((resolve, reject) => {
    const index = internals.db.findIndex(user => user.id === Number(id))
    const user = internals.db[index]

    if (!user) {
      return reject(Boom.notFound('User not found'))
    }

    const updatedUser = Object.assign(user, data)

    internals.db[index] = updatedUser

    resolve(updatedUser)
  })
}

function remove (id) {
  return new Promise((resolve, reject) => {
    const index = internals.db.findIndex(user => user.id === Number(id))

    if (index < 0) {
      return reject(Boom.notFound('User not found'))
    }

    internals.db.splice(index, 1)
    resolve()
  })
}

function list () {
  return new Promise((resolve, reject) => {
    const users = internals.db.map(user => Object.assign({}, user, { password: undefined }))
    resolve(users)
  })
}

function getValidatedUser (username, password) {
  return new Promise((resolve, reject) => {
    const user = internals.db.find(user => user.username === username)

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
