'use strict'

const handlers = require('../handlers')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: handlers.showFrontpage,
    config: {
      description: 'Show frontpage'
    }
  },
  {
    method: 'GET',
    path: '/ip',
    handler: handlers.showMyIp,
    config: {
      auth: false,
      description: 'Show ip'
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
    path: '/logout',
    handler: handlers.doLogout,
    config: {
      auth: false,
      description: 'Logout'
    }
  }
]
