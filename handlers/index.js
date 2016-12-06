'use strict'

var fs = require('fs')
var config = require('../config')
var pkg = require('../package.json')

module.exports.showFrontpage = (request, reply) => {
  reply.view('index')
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
  const yar = request.yar
  var jwt = require('jsonwebtoken')
  var payload = request.payload
  var username = payload.username
  var password = payload.password
  const userId = username
  var LdapAuth = require('ldapauth-fork')
  var auth = new LdapAuth(config.LDAP)

  auth.authenticate(username, password, function (err, user) {
    if (err) {
      console.error(JSON.stringify(err))
      if (err.name || /no such user/.test(err)) {
        var viewOptions = {
          version: pkg.version,
          versionName: pkg.louie.versionName,
          versionVideoUrl: pkg.louie.versionVideoUrl,
          systemName: pkg.louie.systemName,
          githubUrl: pkg.repository.url,
          loginErrorMessage: err.name || 'InvalidCredentialsError'
        }
        reply.view('login', viewOptions, {layout: 'layout-login'})
      }
    } else {
      var tokenOptions = {
        expiresIn: '1h',
        issuer: 'https://auth.t-fk.no'
      }
      var data = {
        cn: user.cn,
        userId: user.sAMAccountName || user.uid || ''
      }
      var token = jwt.sign(data, config.JWT_SECRET, tokenOptions)
      request.cookieAuth.set({
        token: token,
        isAuthenticated: true,
        data: data
      })
      auth.close(function (err) {
        if (err) {
          console.error(err)
        }
      })
      request.seneca.act({role: 'buddy', list: 'contact-classes', userId: userId}, (error, payload) => {
        var myContactClasses = []
        if (error) {
          reply(error)
        } else {
          if (Array.isArray(payload)) {
            myContactClasses = payload
          }
          yar.set('myContactClasses', myContactClasses)
          reply.redirect('/')
        }
      })
    }
  })
}

/*
 // For local testing
 module.exports.doLogin = (request, reply) => {
 const yar = request.yar
 var jwt = require('jsonwebtoken')
 var payload = request.payload
 var username = payload.username
 const userId = username
 // var password = payload.password
 var user = {
 cn: username,
 userId: username
 }
 var tokenOptions = {
 expiresIn: '1h',
 issuer: 'https://auth.t-fk.no'
 }
 var token = jwt.sign(user, config.JWT_SECRET, tokenOptions)
 request.cookieAuth.set({
 token: token,
 isAuthenticated: true,
 data: user
 })

 request.seneca.act({role: 'buddy', list: 'contact-classes', userId: userId}, (error, payload) => {
 var myContactClasses = []
 if (error) {
 reply(error)
 } else {
 if (Array.isArray(payload)) {
 myContactClasses = payload
 }
 yar.set('myContactClasses', myContactClasses)
 reply.redirect('/')
 }
 })
 }
 */

module.exports.doLogout = (request, reply) => {
  request.cookieAuth.clear()
  reply.redirect('/')
}

module.exports.handleSSO = (request, reply) => {
  const ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
  console.log(request)
  reply(`Hello ${ip}`)
  //reply.redirect('/')
}