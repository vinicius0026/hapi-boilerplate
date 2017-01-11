'use strict'

const Joi = require('joi')

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
            username: Joi.string().min(3).max(50).required()
              .description('User\'s username, used for login'),
            password: Joi.string().min(3).max(50).required()
              .description('User\'s password, used for login'),
            scope: Joi.array().items(Joi.string().valid('user', 'admin'))
              .default(['user'])
              .description('User\'s role, used for determining what the user will be able to do in the system')
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
