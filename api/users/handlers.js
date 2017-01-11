'use strict'

const Boom = require('boom')

const User = require('./userModel')

module.exports = {
  create,
  read
}

function create (request, reply) {
  return User.create(request.payload)
    .then(user => reply({ ok: true, message: `Created user with id ${user.id}` }).code(201))
    .catch(err => reply(Boom.wrap(err)))
}

function read (request, reply) {
  const id = request.params.id
  return User.read(id)
    .then(reply)
    .catch(err => reply(Boom.wrap(err)))
}
