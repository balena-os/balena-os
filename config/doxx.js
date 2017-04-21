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
    gitter: 'https://gitter.im/resin-os/chat',
    repo: {
      name: 'resinOS',
      tagLine: 'Run Docker containers on embedded devices',
      description: 'A host OS tailored for containers, designed for reliability, proven in production',
      button: {
        text: 'Try resinOS',
        link: '/#downloads'
      }
    },
    typekitID: 'eic0uah',
    analytics: {
      googleAnalyticsTrackingID: 'UA-45671959-3',
      mixpanelToken: '4d14434a0fbe8653eb9fac3e751a0766',
      gosquaredToken: 'GSN-588929-F'
    },
    company: { title: 'Resin.io', link: 'https://resin.io' },
    menuLinks: [
      { title: 'Docs', link: '/docs' },
      { title: 'Getting Started', link: '/docs/raspberry-pi2/gettingstarted/'},
      { title: 'Features', link: '/#features' },
      { title: 'Downloads', link: '/#downloads' },
      { title: 'Get Involved', link: '/#milestones' }
    ],
    menuSecondaryLinks: [
      { title: 'Privacy Policy', link: 'https://resin.io/privacy-policy/' },
      { title: 'About Us', link: 'https://resin.io/team/' }
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
      version: {
        number: '2.0.0-beta.1',
        name: 'Affogato'
      },
      categories: [
        {
          title: "Raspberry Pi",
          links:[
            {
              title: "Raspberry Pi 1",
              link: "https://files.resin.io/resinos/raspberry-pi/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "Raspberry Pi 2",
              link: "https://files.resin.io/resinos/raspberry-pi2/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "Raspberry Pi 3",
              link: "https://files.resin.io/resinos/raspberrypi3/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Beagle Bone",
          links:[
            {
              title: "Beaglebone Black",
              link: "https://files.resin.io/resinos/beaglebone-black/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "Beaglebone Green",
              link: "https://files.resin.io/resinos/beaglebone-green/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "Beaglebone Green Wifi",
              link: "https://files.resin.io/resinos/beaglebone-green-wifi/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Intel",
          links: [
            {
              title: "Intel Nuc",
              link: "https://files.resin.io/resinos/intel-nuc/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Artik",
          links: [
            {
              title: "Artik 5",
              link: "https://files.resin.io/resinos/artik5/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "Artik 10",
              link: "https://files.resin.io/resinos/artik10/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Odroid",
          links: [
            {
              title: "odroid-c1",
              link: "https://files.resin.io/resinos/odroid-c1/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "odroid-xu4",
              link: "https://files.resin.io/resinos/odroid-xu4/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Via",
          links: [
            {
              title: "via-vab820-quad",
              link: "https://files.resin.io/resinos/via-vab820-quad/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Zynq",
          links: [
            {
              title: "zynq-xz702",
              link: "https://files.resin.io/resinos/zynq-xz702/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Parallella",
          links: [
            {
              title: "Parallella",
              link: "https://files.resin.io/resinos/parallella/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Technologic Systems",
          links: [
            {
              title: "ts4900",
              link: "https://files.resin.io/resinos/ts4900/2.0.0-beta.1/resin-dev.zip"
            },
            {
              title: "ts7700",
              link: "https://files.resin.io/resinos/ts7700/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Solid Run",
          links: [
            {
              title: "hummingboard",
              link: "https://files.resin.io/resinos/hummingboard/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Boundary",
          links: [
            {
              title: "nitrogen6x",
              link: "https://files.resin.io/resinos/nitrogen6x/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        },
        {
          title: "Toradex",
          links: [
            {
              title: "colibri-imx6dl",
              link: "https://files.resin.io/resinos/colibri-imx6dl/2.0.0-beta.1/resin-dev.zip"
            }
          ],
        }
      ]
    }
  }
}
