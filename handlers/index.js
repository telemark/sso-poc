'use strict'

const config = require('../config')
const jwt = require('jsonwebtoken')
const getLdapUser = require('ldap-get-user')

module.exports.showFrontpage = (request, reply) => {
  const viewOptions = {
    credentials: request.auth.credentials
  }

  reply.view('index', viewOptions)
}

module.exports.showLogin = (request, reply) => {
  const ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
  if (config.SSO_IPS.includes(ip)) {
    reply.redirect(config.SSO_LOGIN_URL)
  } else {
    reply.view('login', {}, {layout: 'layout-login'})
  }
}

module.exports.doLogin = (request, reply) => {
  const jwt = require('jsonwebtoken')
  const payload = request.payload
  const username = payload.username
  const password = payload.password
  const LdapAuth = require('ldapauth-fork')
  const auth = new LdapAuth(config.LDAP)

  auth.authenticate(username, password, (error, user) => {
    if (error) {
      console.error(JSON.stringify(error))
      if (error.name || /no such user/.test(error)) {
        reply.view('login', {}, {layout: 'layout-login'})
      }
    } else {
      const tokenOptions = {
        expiresIn: '1h',
        issuer: 'https://auth.t-fk.no'
      }
      const data = {
        cn: user.cn,
        userId: user.sAMAccountName || user.uid || ''
      }
      const token = jwt.sign(data, config.JWT_SECRET, tokenOptions)
      request.cookieAuth.set({
        token: token,
        isAuthenticated: true,
        data: data
      })
      auth.close((err) => {
        if (err) {
          console.error(err)
        }
      })
      reply.redirect('/')
    }
  })
}

module.exports.doLogout = (request, reply) => {
  request.cookieAuth.clear()
  reply.redirect('/')
}

module.exports.handleSSO = (request, reply) => {
  const receivedToken = request.query.jwt
  jwt.verify(receivedToken, config.JWT_SECRET, (error, decrypted) => {
    if (error) {
      reply(error.message || 'Error with token')
    } else {
      const userName = decrypted.userName

      const options = {
        user: userName,
        url: config.LDAP.url,
        bindDn: config.LDAP.bindDn,
        bindCredentials: config.LDAP.bindCredentials,
        searchBase: config.LDAP.searchBase,
        searchFilter: config.LDAP.searchFilter,
        tlsOptions: config.LDAP.tlsOptions
      }

      getLdapUser(options).then((user) => {
        const tokenOptions = {
          expiresIn: '1h',
          issuer: 'https://auth.t-fk.no'
        }
        const data = {
          cn: user.cn,
          userId: user.sAMAccountName || user.uid || ''
        }
        const token = jwt.sign(data, config.JWT_SECRET, tokenOptions)
        request.cookieAuth.set({
          token: token,
          isAuthenticated: true,
          data: data
        })
        reply.redirect('/')
      }).catch((error) => {
        reply(error)
      })
    }
  })
}
