Headroom = require('headroom.js')
// $(".navbar").headroom();

// grab an element
var myElement = document.querySelector(".navbar");
// construct an instance of Headroom, passing the element

// initialise
var UNPIN_OFFSET = 400

var headroom  = new Headroom(myElement, {
  offset: UNPIN_OFFSET,
  tolerance : {
    up : 30,
    down : 0
  }
});
headroom.init();
