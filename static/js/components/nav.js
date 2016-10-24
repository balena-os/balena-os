(function($) {
  Headroom = require('headroom.js')
  var myElement = document.querySelector(".navbar");
  // construct an instance of Headroom, passing the element

  // initialise
  if (!$('.docs').length) {
    var UNPIN_OFFSET = 400
    var headroom  = new Headroom(myElement, {
      offset: UNPIN_OFFSET,
      tolerance : {
        up : 30,
        down : 0
      }
    });
    headroom.init();
  }
})(jQuery)
