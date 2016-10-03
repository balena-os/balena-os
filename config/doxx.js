var _ = require('lodash')
var path = require('path')
var locals = require('./.generatedLocals.json')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  destDir: 'public',
  buildLunrIndex: true,
  parseNav: true,
  serializeNav: true,
  defaultTemplate: 'docs.html',
  mixpanel: {
    token: '9d6bc43e4d64eb3bd64922c969e2955f'
  },
  github: {
    user: 'resin-io',
    repo: 'etcher'
  },
  layoutLocals: locals
}
