'use strict'

const Code = require('code')
const Lab = require('lab')
const Path = require('path')

const lab = exports.lab = Lab.script()
const describe = lab.experiment
const expect = Code.expect
const it = lab.test

const Server = require('../lib')
const UserModel = require('../api/users/userModel')

const internals = {}

internals.User = require('../api/users/users.json')

describe('Auth', () => {
  it('allows user to authenticate via POST /login', done => {
    let server

    Server.init(internals.manifest, internals.composeOptions)
      .then(_server => {
        server = _server

        const admin = internals.User['admin']

        return server.inject({
          method: 'POST',
          url: '/login',
          payload: {
            username: admin.username,
            password: admin.password
          }
        })
      })
      .then(res => {
        console.log('res.result', res.result)
        expect(res.statusCode).to.equal(200)
        server.stop(done)
      })
      .catch(done)
  })
})

internals.manifest = {
  connections: [
    { port: 0 }
  ],
  registrations: [
    { plugin: { register: './lib/auth', options: { getValidatedUser: UserModel.getValidatedUser } } },
    { plugin: 'hapi-auth-cookie' }
  ]
}

internals.composeOptions = {
  relativeTo: Path.resolve(__dirname, '..')
}
