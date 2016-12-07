'use strict'

// For OpenLDAP:
// searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})'
// For Active Directory:
// searchFilter: '(sAMAccountName={{username}})'

const SERVER_PORT = process.env.SERVER_PORT || 8000
const SSO_IPS = process.env.SSO_IPS ? process.env.SSO_IPS.split(',') : ['139.164.160.2', '213.188.19.179']
const ldapTlsSettings = require('../lib/ldap-tls-settings')

module.exports = {
  SERVER_PORT: SERVER_PORT,
  JWT_SECRET: process.env.JWT_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  YAR_SECRET: process.env.YAR_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  COOKIE_SECRET: process.env.COOKIE_SECRET || 'Louie Louie, oh no, I got to go Louie Louie, oh no, I got to go',
  AUTH_LOGIN_URL: process.env.AUTH_LOGIN_URL || '/login',
  SSO_IPS: SSO_IPS,
  SSO_LOGIN_URL: process.env.SSO_LOGIN_URL || 'https://sso.t-fk.no',
  LDAP: {
    url: process.env.LDAP_URL || 'ldap://ldap.forumsys.com:389',
    bindDn: process.env.LDAP_BIND_DN || 'cn=read-only-admin,dc=example,dc=com',
    bindCredentials: process.env.LDAP_BIND_CREDENTIALS || 'password',
    searchBase: process.env.LDAP_SEARCH_BASE || 'dc=example,dc=com',
    searchFilter: process.env.LDAP_SEARCH_FILTER || '(uid={{username}})',
    tlsOptions: ldapTlsSettings()
  }
}
