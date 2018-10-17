const path = require('path');

const containers = path.resolve(`${__dirname}/pages`);

module.exports = {
  getRoutes: ({ siteProps }) => {
    const routes = [
      {
        path: '/',
        title: 'Home',
        component: `${containers}/Home`,
      },
      {
        component: `${containers}/Docs`,
        title: 'Docs',
        path: '/docs',
        children: siteProps.docs.map(doc => {
          return {
            component: `${containers}/Doc`,
            title: doc.title,
            path: `/${doc.slug}`,
          };
        }),
      },
      {
        component: `${containers}/Changelog`,
        title: 'Changelog',
        path: '/changelog',
      },
      {
        is404: true,
        path: '',
        component: `${containers}/404`,
      },
    ];

    return routes;
  },
};
