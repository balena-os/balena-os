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
    user: 'resin-os',
    repo: 'meta-resin'
  },
  layoutLocals: {
    repo: {
      name: 'resinOS',
      tagLine: 'Run Docker containers on embedded devices',
      description: 'A host OS tailored for containers, designed for reliability, proven in production'
    },
    typekitID: 'eic0uah',
    analytics: {
      googleAnalyticsTrackingID: 'UA-45671959-3',
      mixpanelToken: '4d14434a0fbe8653eb9fac3e751a0766',
      gosquaredToken: 'GSN-588929-F'
    },
    company: { title: 'Resin.io', link: 'https://resin.io' },
    menuLinks: [
      { title: 'Documentation', link: '/docs' },
      { title: 'Features', link: '/#features' },
      { title: 'Downloads', link: '/#downloads' },
      { title: 'Get Involved', link: '/#milestones' },
    ],
    features: [
      {
        title: "Tailored for containers",
        description: "Containers will revolutionize connected devices, and resinOS is the best way to run them",
        icon: 'containers'
      },
      {
        title: "Built to last anywhere",
        description: "Made to survive harsh networking conditions and unexpected shutdowns",
        icon: 'robust'
      },
      {
        title: "Just the essentials",
        description: "A minimal Linux with the services needed to run Docker reliably on an embedded device - nothing else",
        icon: 'minimal'
      },
      {
        title: "Easy to port",
        description: "Based on Yocto Linux for easy porting to most capable device types across varied CPU architectures",
        icon: 'adaptable'
      },
      {
        title: "Fast, modern workflow",
        description: "Who said embedded software has to be slow and painful to develop?",
        icon: 'simple'
      },
      {
        title: "Open and friendly",
        description: "Actively developed in the open; community participation warmly welcomed",
        icon: 'open'
      }
    ],
    downloads: {
      version: '0.0.1',
      categories: [
        {
          title: "Raspberry Pi",
          links:[
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
        },
        {
          title: "Beagle Bone",
          links:[
            {
              title: "Raspberrypi3-image",
              link: "#"
            }
          ],
        },
        {
          title: "Intel",
          links: [
            {
              title: "edison-image",
              link: "#"
            },
            {
              title: "nuc-image",
              link: "#"
            }
          ],
        },
        {
          title: "Artik",
          links: [
            {
              title: "artik-5",
              link: "#"
            },
            {
              title: "artik-10",
              link: "#"
            }
          ],
        },
        {
          title: "Odroid",
          links: [
            {
              title: "odroid-5",
              link: "#"
            },
            {
              title: "ordoid-10",
              link: "#"
            }
          ],
        },
        {
          title: "Via",
          links: [
            {
              title: "via-5",
              link: "#"
            },
            {
              title: "via-10",
              link: "#"
            }
          ],
        },
        {
          title: "Zynq",
          links: [
            {
              title: "zync-5",
              link: "#"
            },
            {
              title: "zync-10",
              link: "#"
            }
          ],
        },
        {
          title: "parallella",
          links: [
            {
              title: "parallella-5",
              link: "#"
            },
            {
              title: "parallella-10",
              link: "#"
            }
          ],
        }
      ]
    }
  }
}
