'use strict'

const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.showFrontpage,
    config: {
      auth: false,
      description: 'Show frontpage'
    }
  },
  {
    method: 'GET',
    path: '/ssostart',
    handler: handlers.handleSSO,
    config: {
      auth: false,
      description: 'SSO'
    }
  },
  {
    method: 'GET',
    path: '/login',
    config: {
      handler: handlers.showLogin,
      description: 'Show the Logingpage',
      auth: false
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: handlers.doLogin,
      description: 'Login',
      auth: false
    }
  },
  {
    method: 'GET',
    path: '/logout',
    handler: handlers.doLogout,
    config: {
      auth: false,
      description: 'Logout'
    }
  }
]
