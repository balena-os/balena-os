const mixpanel = require('mixpanel-browser');
const doxxConfig = require('../../config/doxx')

mixpanel.init(doxxConfig.mixpanel.token);

mixpanel.track( document.title + ' page viewed', {
  'page name' : document.title,
  'url' : window.location.pathname
});

$('body').on('click', '[data-track]', function() {
  var event_name = $(this).data('track');
  try {
    var event_attrs = $(this).data('track-data');
  }
  catch(err) {
    console.log(err);
  }

  mixpanel.track(event_name, event_attrs);
});
