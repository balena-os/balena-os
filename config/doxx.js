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
    downloads: {
      version: '0.0.1',
      categories: {
        rpi: [
          {
            title: "Raspberrypi-image",
            link: "#"
          },
          {
            title: "Raspberrypi2-image",
            link: "#"
          },
          {
            title: "Raspberrypi3-image",
            link: "#"
          }
        ],
        beaglebone: [
          {
            title: "Raspberrypi3-image",
            link: "#"
          }
        ],
        intel: [
          {
            title: "edison-image",
            link: "#"
          },
          {
            title: "nuc-image",
            link: "#"
          }
        ],
        artik: [
          {
            title: "artik-5",
            link: "#"
          },
          {
            title: "artik-10",
            link: "#"
          }
        ],
        odroid: [
          {
            title: "odroid-5",
            link: "#"
          },
          {
            title: "odroid-10",
            link: "#"
          }
        ],
        via: [
          {
            title: "odroid-5",
            link: "#"
          },
          {
            title: "odroid-10",
            link: "#"
          }
        ],
        zynq: [
          {
            title: "odroid-5",
            link: "#"
          },
          {
            title: "odroid-10",
            link: "#"
          }
        ],
        parallella: [
          {
            title: "odroid-5",
            link: "#"
          },
          {
            title: "odroid-10",
            link: "#"
          }
        ]
      }
    }
  }
}
