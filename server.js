'use strict'

const Hapi = require('hapi')
const Yar = require('yar')
const hapiAuthCookie = require('hapi-auth-cookie-issamesite-patch')
const hapiAuthJwt2 = require('hapi-auth-jwt2')
const vision = require('vision')
const inert = require('inert')
const server = new Hapi.Server()
const config = require('./config')
const tilskuddService = require('./index')
const validateSession = require('./lib/validate-session')
const validateJwt = require('./lib/validate-jwt')

const yarOptions = {
  storeBlank: false,
  cookieOptions: {
    password: config.YAR_SECRET,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  }
}

server.connection({
  port: config.SERVER_PORT
})

const plugins = [
  {register: Yar, options: yarOptions},
  {register: vision},
  {register: inert},
  {register: hapiAuthCookie},
  {register: hapiAuthJwt2}
]

server.register(plugins, error => {
  if (error) {
    console.error('Failed to load a plugin:', error)
  }

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'views',
    helpersPath: 'views/helpers',
    partialsPath: 'views/partials',
    layoutPath: 'views/layouts',
    layout: true,
    compileMode: 'sync'
  })

  server.route({
    method: 'GET',
    path: '/public/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    },
    config: {
      auth: false
    }
  })

  server.auth.strategy('session', 'cookie', {
    password: config.COOKIE_SECRET,
    cookie: 'tilskudd-session',
    validateFunc: validateSession,
    redirectTo: config.LOGIN_URL,
    isSecure: process.env.NODE_ENV !== 'development',
    isSameSite: 'Lax'
  })

  server.auth.default('session')

  server.auth.strategy('jwt', 'jwt', {
    key: config.JWT_SECRET,          // Never Share your secret key
    validateFunc: validateJwt,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  })

  registerRoutes()
})

function registerRoutes () {
  server.register([
    {
      register: tilskuddService,
      options: {}
    }
  ], function (err) {
    if (err) {
      console.error('Failed to load a plugin:', err)
    }
  })
}

module.exports.start = () => {
  server.start(() => {
    console.log('Server running at:', server.info.uri)
  })
}

module.exports.stop = () => {
  server.stop(() => {
    console.log('Server stopped')
  })
}
