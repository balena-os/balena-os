$('body').on('click', '[data-track]', function() {
  var event_name = $(this).data('track');
  try {
    var event_attrs = $(this).data('track-data');
  }
  catch(err) {
    throw err
  }
  mixpanel.track(event_name, event_attrs);
});
