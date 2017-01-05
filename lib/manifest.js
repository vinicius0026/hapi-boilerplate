'use strict'

const UserModel = require('../api/users/userModel')

module.exports = {
  connections: [
    { host: 'localhost', port: 8000 }
  ],
  registrations: [
    { plugin: { register: './lib/auth', options: { getValidatedUser: UserModel.getValidatedUser } } },
    { plugin: 'hapi-auth-cookie' },
    { plugin: 'inert' },
    { plugin: 'vision' },
    { plugin: 'lout' }
  ]
}
