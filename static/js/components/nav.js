Headroom = require('headroom.js')
// $(".navbar").headroom();

// grab an element
var myElement = document.querySelector(".navbar");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();
