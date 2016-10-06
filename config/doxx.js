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
    typekitID: 'eic0uah',
    analytics: {
      googleAnalyticsTrackingID: null,
      mixpanelToken: '9d6bc43e4d64eb3bd64922c969e2955f',
      gosquaredToken: null
    },
    company: { title: 'Resin.io', link: 'https://resin.io' },
    menuLinks: [
      { title: 'Documentation', link: '/docs' },
      { title: 'Features', link: '/#features' },
      { title: 'Downloads', link: '/#downloads' },
      { title: 'Get Involved', link: '/#milestones' },
    ],
    tweet: 'Look at this thing I made',
    features: [
      {
        title: "containers",
        description: "Brings standard Docker containers to embedded devices"
      },
      {
        title: "adaptable",
        description: "Works on diverse device types and architectures"
      },
      {
        title: "minimal",
        description: "Thin and minimally sized, with just the essentials"
      },
      {
        title: "robust",
        description: "Robust and battle-tested in production"
      },
      {
        title: "simple",
        description: "Simple and easy to use"
      },
      {
        title: "open",
        description: "Open Source and free"
      }
    ],
    deviceFamilys: [
      {
        title: "Raspberrypi",
        description: "My oh my",
        link: "#",
        image: "icon"
      },
      {
        title: "beaglebone",
        description: "My oh my",
        link: "#",
        image: "icon"
      },
      {
        title: "intel",
        description: "Features I got features!",
        link: "#",
        image: "icon"
      },
      {
        title: "artik",
        description: "Features I got features!",
        link: "#",
        image: "icon"
      },
    ]
  }
}
