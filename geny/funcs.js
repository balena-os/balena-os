const Promse = require('bluebird')
const GitHubApi = require('github')
const config = require('../config/doxx')
var ghConfig = config.github
var exports = module.exports = {};
var _ = require('lodash')
var github = new GitHubApi({
    // optional
    // debug: true,
    Promise: require('bluebird'),
    timeout: 5000
});
github.authenticate({
    type: "basic",
    username: process.env.GH_USERNAME,
    password: process.env.GH_TOKEN
});

exports.getRepo = function() {
  var ghConfig = config.github
  return github.repos.get({
    repo: ghConfig.repo,
    user: ghConfig.user
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

exports.getFAQs = function() {
  return github.repos.getContent({
    repo: ghConfig.repo,
    user: ghConfig.user,
    path: "README.md"
  }).then(function(data) {
    return github.misc.renderMarkdown({
    "text": new Buffer(data.content.toString(), 'base64').toString('ascii')
    })
  });
};

exports.getMileStones = function() {
  var totalIssues = function (milestone) {
    milestone.total_issues = milestone.closed_issues + milestone.open_issues
    return milestone
  }
  return github.issues.getMilestones({
    repo: ghConfig.repo,
    user: ghConfig.user
  }).then(function(data) {
    return { milestones: _.map(data, totalIssues) }
  })
};

exports.getX = function() {
  return new Promise((resolve) => {
    resolve({ tweet: 'shiiit' })
  })
};
