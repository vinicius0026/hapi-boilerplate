'use strict'

const Confidence = require('confidence')
const Dotenv = require('dotenv')

Dotenv.config()

const internals = {}

const criteria = {
  env: process.env.NODE_ENV
}

const config = {
  $meta: 'Environment based configuration',
  cookieSecret: {
    $filter: 'env',
    prod: process.env.COOKIE_SECRET,
    $default: 'superlongandsecretpasswordthatnoonewillguess'
  }
}

internals.store = new Confidence.Store(config)

exports.get = key => internals.store.get(key, criteria)
