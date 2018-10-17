var _ = require('lodash');
var deviceDict = require('./config/dictionaries/device.json');

module.exports = {
  theme: 'www/theme',
  settings: {
    title: 'balenaOS',
    lead: 'Run Docker containers on embedded devices',
    description:
      'A host OS tailored for containers, designed for reliability, proven in production.',
    analytics: {
      gaId: 'UA-45671959-3',
      mixpanelToken: '4d14434a0fbe8653eb9fac3e751a0766',
      gosquaredToken: 'GSN-588929-F',
    },
    featuresLead: 'A operating system tailored for containers',
    features: [
      {
        title: 'Tailored for containers',
        icon: 'containers',
        description:
          'Containers will revolutionize connected devices, and BalenaOS is the best way to run them.',
      },
      {
        title: 'Built to last anywhere',
        icon: 'robust',
        description:
          'AMade to survive harsh networking conditions and unexpected shutdowns.',
      },
      {
        title: 'Just the essentials',
        icon: 'minimal',
        description:
          'A minimal Linux with the services needed to run Docker reliably on an embedded device - nothing else.',
      },
      {
        title: 'Easy to port',
        icon: 'adoptable',
        description:
          'Based on Yocto Linux for easy porting to most capable device types across varied CPU architectures.',
      },
      {
        title: 'Fast, modern workflow',
        icon: 'simple',
        description:
          'Who said embedded software has to be slow and painful to develop?',
      },
      {
        title: 'Open and friendly',
        icon: 'open',
        description:
          'Actively developed in the open; community participation warmly welcomed.',
      },
    ],
    motivation: {
      paragraphs: [
        'In our quest to build resin.io, a platform that brings the tools of modern software development to the world of connected hardware, we started by porting Docker to ARM chips in 2013. We soon realised that we also needed an operating system optimized for the use case: a minimal OS ideal for running containers on embedded devices.',
        'BalenaOS supports almost 20 distinct device types, has a robust networking and provisioning story, emphasizes reliability over long periods operation, and enables a productive developer workflow.  We’ve been running BalenaOS as part of the resin.io platform for years and are now releasing it as an independent operating system, so that others can benefit and contribute to running containers on connected devices.',
      ],
    },
    downloads: {
      version: {
        number: '2.0.0',
        name: 'Affogato',
      },
      baseUrl: 'https://',
      categories: _.mapValues(_.groupBy(deviceDict, 'family')),
    },
  },
};
