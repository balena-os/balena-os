const funcs = require('./funcs')
const _ = require('lodash')
const Promise = require('bluebird')
const userSettings = require('../config/locals.json')
const fs = require('fs')

var promises = []

var flatten = function(objArray) {
  var flatObj = {}
  _.map(objArray, function(v) {
    _.assignIn(flatObj, v)
  })
  return flatObj
}

var merge = function(generatedSettings, userSettings) {
  return new Promise(function(resolve, reject) {
    resolve(_.merge({}, flatten(generatedSettings), userSettings));
  })
}

module.exports.run = function(userSettings) {
  console.log("Generating Data")
  // run all funcs
  _.forOwn(funcs, function(value, key) {
    promises.push(funcs[key]())
  })

  // catch all returns
  return Promise.all(promises).then(function(generatedSettings) {
    // give userSettings precedence
    return merge(generatedSettings, userSettings).then(function(mergedConfig) {
      fs.writeFile('config/.generatedLocals.json', JSON.stringify(mergedConfig, null, 2), function(err) {
        if(err) {
            throw console.log(err)
        }
        console.log("The config file was saved!")

      })
      return mergedConfig
    })
  }).catch(err => {
    console.log(err)
    throw err
  })
}
