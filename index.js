var path = require('path')
var express = require('express')
var _ = require('lodash')

var navTree = require('./nav.json')

var Doxx = require('@resin.io/doxx')
var doxxConfig = require('./config/doxx')
var app = module.exports.app = exports.app = express();

//you won't need 'connect-livereload' if you have livereload plugin for your browser
if (process.env.ENV === 'dev') {
  app.use(require('connect-livereload')())
}

var doxx = Doxx(doxxConfig)
doxx.configureExpress(app)
doxx.loadLunrIndex()

var contentsDir = path.join(__dirname, doxxConfig.destDir)
var staticDir = path.join(__dirname, 'public/assets')
app.use(express.static(staticDir))
app.use(express.static(contentsDir))

var getLocals = function (extra) {
  return doxx.getLocals({ nav: navTree }, extra)
}

app.get('/search-results', function (req, res) {
  var searchTerm = req.query.searchTerm
  res.render('search', getLocals({
    title: "Search results for " + searchTerm,
    breadcrumbs: [
      'Search Results',
      searchTerm
    ],
    searchTerm: searchTerm,
    searchResults: doxx.lunrSearch(searchTerm)
  }))
})

app.use(express.static(contentsDir))

app.get('*', function (req, res) {
  res.render('not-found', getLocals({
    title: "We don't seem to have such page",
    breadcrumbs: [ 'Page not found' ]
  }))
})

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log("Server started, open http://localhost:" + port)
})
