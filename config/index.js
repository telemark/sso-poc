'use strict'

const SERVER_PORT = process.env.SERVER_PORT || 8000
const SSO_IPS = process.env.SSO_IPS ? process.env.SSO_IPS.split(',') : ['139.164.160.2', '213.188.19.179']

module.exports = {
  SERVER_PORT: SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  YAR_SECRET: process.env.YAR_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  AUTH_LOGIN_URL: process.env.AUTH_LOGIN_URL || 'https://ldap.auth.mikrotjeneste.win/auth',
  SSO_IPS: SSO_IPS,
  SSO_LOGIN_URL: process.env.SSO_LOGIN_URL || 'https://sso.t-fk.no',
  ENCRYPTOR_SECRET: process.env.ENCRYPTOR_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  SESSION_STORAGE_URL: process.env.SESSION_STORAGE_URL || 'https://tmp.storage.micro.t-fk.no'
}
