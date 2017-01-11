'use strict'

const Boom = require('Boom')

const User = require('./userModel')

module.exports = {
  create
}

function create (request, reply) {
  return User.create(request.payload)
    .then(user => reply({ ok: true, message: `Created user with id ${user.id}` }).code(201))
    .catch(err => reply(Boom.wrap(err)))
}
