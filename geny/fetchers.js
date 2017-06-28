const Promise = require('bluebird')
const GitHubApi = require('github')
const config = require('../config/doxx')
var ghConfig = config.github
var exports = module.exports = {};
var _ = require('lodash')
var moment = require('moment')
var $ = require('jquery')
var markdowny = require("./markdowny");

var https = require('https');
var fs = require('fs');

var github = new GitHubApi({
    Promise: require('bluebird'),
    timeout: 5000
});

if (process.env.GH_TOKEN) {
  github.authenticate({
    type: "token",
    token: process.env.GH_TOKEN
  });
} else {
  console.log("No github credentials provided")
}


exports.getRepo = function() {
  var ghConfig = config.github
  return github.repos.get({
    repo: ghConfig.repo,
    user: ghConfig.user
  }).then(function(data) {
    return ({
      repo: {
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        link: data.html_url
      }
    })
  });
};

exports.getFAQs = function() {
  return github.repos.getContent({
    repo: 'resinos',
    user: 'resin-os',
    path: "/pages/docs/faqs.md"
  }).then(function(data) {
    return {
      FAQs: markdowny(new Buffer(data.content.toString(), 'base64').toString(), { startLevel: 2})
    }
  })
};

// exports.getDocs = function() {
//   function downloadSave(content) {
//     var file = fs.createWriteStream('./pages/docs/' + content.name);
//     var request = https.get(content.download_url, function(response) {
//       response.pipe(file);
//     }).on('error', function(err) { // Handle errors
//       fs.unlink('./pages/docs/' + file.name); // Delete the file async. (But we don't check the result)
//       throw err
//     });
//   }
//
//   return github.repos.getContent({
//     repo: ghConfig.repo,
//     user: ghConfig.user,
//     path: "docs"
//     }).then(function(data) {
//       // only repull docs if var is set
//       if (process.env.DOCS) {
//         _.map(data, downloadSave)
//       }
//       return
//   });
// };

exports.getMileStones = function() {
  var totalIssues = function (milestone) {
    milestone.complete = Math.floor((milestone.closed_issues/(milestone.closed_issues + milestone.open_issues))*100)
    milestone.updated_at = moment(milestone.updated_at).fromNow();
    milestone.due_on = moment(milestone.due_on).calendar();
    return milestone
  }
  return github.issues.getMilestones({
    repo: ghConfig.repo,
    user: ghConfig.user
  }).then(function(data) {
    return { milestones: _.map(data, totalIssues) }
  })
};
