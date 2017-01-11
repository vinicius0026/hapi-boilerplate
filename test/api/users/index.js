'use strict'

const Code = require('code')
const Lab = require('lab')
const Path = require('path')

const lab = exports.lab = Lab.script()
const describe = lab.experiment
const expect = Code.expect
const it = lab.test
const before = lab.before
const after = lab.after

const UserModel = require('../../../api/users/userModel')
const Server = require('../../../lib')

const internals = {}

internals.User = require('../../../api/users/users.json')

describe('User API Tests', () => {
  describe('Create User Tests', () => {
    it('creates user if authenticated as admin', done => {
      let server

      Server.init(internals.manifest, internals.composeOptions)
        .then(_server => {
          server = _server
          const user = internals.User[0]

          return internals.authenticateUser(server, user)
        })
        .then(cookie => server.inject({
          method: 'POST',
          url: '/api/users',
          payload: {
            username: 'new-user',
            password: 'some-passsss',
            scope: ['user']
          },
          headers: { cookie }
        }))
        .then(res => {
          expect(res.statusCode).to.equal(201)
          expect(res.result.ok).to.equal(true)
          expect(res.result.message).to.match(/^Created user with id \d+$/)

          server.stop(done)
        })
        .catch(done)
    })

    it('doesnt create user if username is already taken', done => {
      let server

      Server.init(internals.manifest, internals.composeOptions)
        .then(_server => {
          server = _server
          const user = internals.User[0]

          return internals.authenticateUser(server, user)
        })
        .then(cookie => server.inject({
          method: 'POST',
          url: '/api/users',
          payload: {
            username: 'admin',
            password: 'some-passsss',
            scope: ['user']
          },
          headers: { cookie }
        }))
        .then(res => {
          expect(res.statusCode).to.equal(400)
          expect(res.result.message).to.equal('Username already taken')
          server.stop(done)
        })
        .catch(done)
    })
  })

  describe('Read User Tests', () => {
    let server
    let userId
    let authCookie

    const user = {
      username: 'userrr',
      password: 'some-passs',
      scope: ['user']
    }

    before(done => {
      Server.init(internals.manifest, internals.composeOptions)
        .then(_server => {
          server = _server

          const user = internals.User[0]

          return internals.authenticateUser(server, user)
        })
        .then(cookie => {
          authCookie = cookie
          return server.inject({
            method: 'POST',
            url: '/api/users',
            payload: user,
            headers: { cookie }
          })
        })
        .then(res => {
          userId = res.result.message.match(/^Created user with id (\d+)$/)[1]
        })
        .then(done)
        .catch(done)
    })

    after(done => server.stop(done))

    it('Reads an user', done => {
      server.inject({
        url: `/api/users/${userId}`,
        headers: { cookie: authCookie }
      })
      .then(res => {
        expect(res.statusCode).to.equal(200)
        const _user = res.result
        expect(_user.username).to.equal(user.username)
        expect(_user.scope).to.equal(user.scope)
        expect(_user.password).to.not.exist()
        done()
      })
      .catch(done)
    })

    it('Returns 404 if user doesnt exist', done => {
      server.inject({
        url: '/api/users/99',
        headers: { cookie: authCookie }
      })
      .then(res => {
        expect(res.statusCode).to.equal(404)
        expect(res.result.message).to.equal('User not found')
        done()
      })
      .catch(done)
    })
  })
})

internals.authenticateUser = function (server, credentials) {
  return server.inject({
    method: 'POST',
    url: '/login',
    payload: {
      username: credentials.username,
      password: credentials.password
    }
  })
  .then(res => {
    const header = res.headers['set-cookie']
    /* eslint-disable */
    const cookie = header[0].match(/(?:[^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)\s*=\s*(?:([^\x00-\x20\"\,\;\\\x7F]*))/)
    /* eslint-enable */

    return cookie[0]
  })
}

internals.manifest = {
  connections: [
    { port: 0 }
  ],
  registrations: [
    { plugin: { register: './lib/auth', options: { getValidatedUser: UserModel.getValidatedUser } } },
    { plugin: './api/users' },
    { plugin: 'hapi-auth-cookie' }
  ]
}

internals.composeOptions = {
  relativeTo: Path.resolve(__dirname, '../../..')
}
