# Hapijs Boilerplate

[![Build Status](https://travis-ci.org/vinicius0026/hapi-boilerplate.svg?branch=master)](https://travis-ci.org/vinicius0026/hapi-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/vinicius0026/hapi-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/vinicius0026/hapi-boilerplate?branch=master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![Dependencies](https://david-dm.org/vinicius0026/hapi-boilerplate.svg)](https://david-dm.org/vinicius0026/hapi-boilerplate)

Yet another hapi boilerplate for a RESTFul server. Opinionated.

Using Node Native Promises for async handling, standardjs for linting, and
grouping files by resource (for the API).

Leverages the hapi ecosystem to a great extent:

- [Lab](https://github.com/hapijs/lab) and [Code](https://github.com/hapijs/code)
for testing
- [Glue](https://github.com/hapijs/glue) for server configuration and plugin
registration
- [hapi-auth-cookie](https://github.com/hapijs/hapi-auth-cookie) for
authentication
- Hapi builtin authorization via scope (see
[route options](https://hapijs.com/api#route-options) in Hapi API docs for
details)
- [Confidence](https://github.com/hapijs/confidence) for config management
- [Crumb](https://github.com/hapijs/crumb) for CSRF prevention
- [Joi](https://github.com/hapijs/joi) for validation
- [Boom](https://github.com/hapijs/boom) for http error responses
- [Good](https://github.com/hapijs/good) for logging
- [Lout](https://github.com/hapijs/lout) (+
[Vision](https://github.com/hapijs/vision) &
[Inert](https://github.com/hapijs/inert)) for automatic documentation

Uses a fake json database in order to be DB agnostic, but it can easily be
used with any DB, with small changes.

This boilerplate has authentication and authorization setup, and user management
api routes, for both demo purposes and to bootstrap an application easily.

## Running locally

- Clone repo
- Run `npm install`
- Setup environment variables in a .env file (see dotenv). The following
environment varibles must be set:
  - NODE_ENV: should be either `test`, `dev`, `staging` or `prod`
  - COOKIE_SECRET: the secret used to protect the cookie data used in
  authentication (required only for `prod` environment)
- Run `npm run`

## Contributing

Feel free to clone and make the changes you want. If you want to commit them back
to this repo, please ensure that tests pass and coverage is > 95% (ideally 100%)

## License

MIT License

## TODO

- implement users API
