# Hapijs Boilerplate

[![Build Status](https://travis-ci.org/vinicius0026/hapi-boilerplate.svg?branch=master)](https://travis-ci.org/vinicius0026/hapi-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/vinicius0026/hapi-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/vinicius0026/hapi-boilerplate?branch=master)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Yet another hapi boilerplate for a RESTFul server. Opinionated.

Using Node Native Promises for async handling, standardjs for linting, and
grouping files by resource (for the API).

Leverages the hapi ecosystem to a great extent:

- Lab and Code for testing
- Glue for server configuration and plugin registration
- hapi-cookie-auth for authentication
- Hapi builtin authorization scheme
- Crumb for CSRF prevention
- Joi for validation
- Boom for http error responses
- Good for logging
- Lout (+ Vision & Inert) for automatic documentation

Uses a fake json database in order to be DB agnostic, but it can easily be
used with any DB, with small changes.

This boilerplate has authentication and authorization setup, and user management
api routes, for both demo purposes and to bootstrap an application easily.

## TODO

- create config file
- implement users API
- implement logging with Good
