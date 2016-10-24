// This module generates data from custom requests (see fetchers.js)
// and merges results with doxxConfig.layout

const fetchers = require('./fetchers')
const modifiers = require('./modifiers')
const _ = require('lodash')
const Promise = require('bluebird')
const fs = require('fs')

var promises = []

var flatten = function(objArray) {
  var flatObj = {}
  _.map(objArray, function(v) {
    _.assignIn(flatObj, v)
  })
  return flatObj
}

// merges pulled data and doxx.config.layoutLocals
var merge = function(doxxConfig, generatedSettings) {
  return new Promise(function(resolve, reject) {
    resolve(_.merge({}, flatten(generatedSettings), doxxConfig));
  })
}

module.exports.run = function(doxxConfig) {
  // run all fetchers
  _.forOwn(fetchers, function(value, key) {
    promises.push(fetchers[key]())
  })

  // catch all returns
  return Promise.all(promises).then(function(generatedSettings) {
    // give userSettings precedence
    return merge(doxxConfig.layoutLocals, generatedSettings).then(function(mergedConfig) {
      doxxConfig.layoutLocals = mergedConfig
      return doxxConfig
    })
  }).catch(err => {
    console.log(err)
    throw err
  })
}
