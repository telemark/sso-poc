'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const tokenOptions = {
  expiresIn: '1h',
  issuer: 'https://auth.t-fk.no'
}
const data = {
  userName: 'riemann'
}

const token = jwt.sign(data, config.JWT_SECRET, tokenOptions)

console.log(token)
