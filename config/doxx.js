var _ = require('lodash')
var path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  destDir: 'public',
  buildLunrIndex: true,
  parseNav: true,
  serializeNav: true,
  defaultTemplate: 'docs.html',
  github: {
    user: 'resin-io',
    repo: 'etcher'
  },
  layoutLocals: {
    analytics: {
      googleAnalyticsTrackingID: null,
      mixpanelToken: '9d6bc43e4d64eb3bd64922c969e2955f',
      gosquaredToken: null
    },
    menuLinks: [
      { title: 'Resin.io', link: 'https://resin.io' },
      { title: 'Documentation', link: '/docs' },
    ],
    tweet: 'Look at this thing I made',
    features: [
      {
        title: "Buzzy buzz word",
        description: "Something you'd tell your moms",
        link: "#",
        image: "icon"
      },
      {
        title: "Buzzy buzz word",
        description: "My oh my",
        link: "#",
        image: "icon"
      },
      {
        title: "Buzzy buzz word",
        description: "Features I got features!",
        link: "#",
        image: "icon"
      }
    ]
  }
}
