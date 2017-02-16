'use strict'

const config = require('../config')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const encryptor = require('simple-encryptor')(config.ENCRYPTOR_SECRET)

module.exports.showFrontpage = (request, reply) => {
  const viewOptions = {
    credentials: request.auth.credentials
  }

  reply.view('index', viewOptions)
}

module.exports.showMyIp = (request, reply) => {
  const ip = request.headers['x-forwarded-for'] || request.info.remoteAddress
  reply({ip: ip})
}

module.exports.doLogout = (request, reply) => {
  request.cookieAuth.clear()
  reply.redirect('/')
}

module.exports.handleSSO = (request, reply) => {
  const receivedToken = request.query.jwt
  jwt.verify(receivedToken, config.JWT_SECRET, (error, decoded) => {
    if (error) {
      reply(error.message || 'Error with token')
    } else {
      const jwtData = encryptor.decrypt(decoded.data)
      const sessionUrl = `${config.SESSION_STORAGE_URL}/${jwtData.session}`

      axios.get(sessionUrl)
        .then(result => {
          const user = encryptor.decrypt(result.data.value)
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
        })
        .catch(error => {
          reply(error)
        })
    }
  })
}
