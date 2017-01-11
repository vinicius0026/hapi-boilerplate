'use strict'

const User = require('./model')
const Handlers = require('./handlers')

const internals = {}

internals.basePath = '/api/users'

exports.register = (server, options, next) => {
  server.dependency('Auth', internals.registerRoutes)
  next()
}

exports.register.attributes = {
  name: 'UserAPIRouter'
}

internals.registerRoutes = function (server, next) {
  server.route([
    {
      method: 'POST',
      path: internals.basePath,
      config: {
        description: 'Create users',
        validate: {
          payload: {
            username: User.model.username.required(),
            password: User.model.password.required(),
            scope: User.model.scope.default(['user'])
          }
        },
        handler: Handlers.create
      }
    },
    {
      method: 'GET',
      path: `${internals.basePath}/{id}`,
      config: {
        auth: {
          access: {
            scope: ['user', 'admin']
          }
        },
        description: 'Read user data',
        handler: Handlers.read
      }
    }
  ])

  next()
}
