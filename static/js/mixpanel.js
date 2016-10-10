var doxxConfig = require('../../config/doxx')

if (doxxConfig.layoutLocals.analytics.mixpanelToken && window.location.host.split(':')[0] != 'localhost') {
  var mixpanel = require('mixpanel-browser');

  mixpanel.init(mixpanel.init(doxxConfig.layoutLocals.analytics.mixpanelToken));

  mixpanel.track('page viewed', {
    'page name' : document.title,
    'url' : window.location.pathname
  });

  $('body').on('click', '[data-track]', function() {
    var eventName = $(this).data('track');
    try {
      var eventMeta = $(this).data('track-meta');
    }
    catch(err) {
      throw err
    }
    mixpanel.track(eventName, eventMeta);
  });
} else {
  console.log('mixpanel tracking disable or in dev mode')
}
