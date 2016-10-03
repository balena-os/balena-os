const Promse = require('bluebird')
const GitHubApi = require('github')
const config = require('../config/doxx')
var exports = module.exports = {};

var github = new GitHubApi({
    // optional
    // debug: true,
    Promise: require('bluebird'),
    timeout: 5000
});
github.authenticate({
    type: "basic",
    username: process.env.ghUsername,
    password: process.env.ghToken
});

exports.getRepo = function() {
  var ghConfig = config.github
  return github.repos.get({
    "repo": ghConfig.repo,
    "user": ghConfig.user
  }).then(function(data) {
    return ({
      repo: {
        name: data.name,
        description: data.description,
        url: data.url
      }
    })
  });
};

exports.getX = function() {
  return new Promise((resolve) => {
    resolve({ tweet: 'shiiit' })
  })
};
