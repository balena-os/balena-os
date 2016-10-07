var _ = require('lodash')
var text = $('#downloads__wellTmpl').html()
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
var catRef = null;

$(".downloads__category").click(function(){
  var downloads = $(this).data('downloads')
  var cat = $(this).data('cat')

  if($(window).width() < 767) {
    // if mobile drop immediately below item
    var container = $(this)
  } else {
    var container = $(this).closest('.downloads__row')
  }

  if ($('.downloads__well')) {
    $('.downloads__well').remove()
  }

  if (cat != catRef) {
    $(compiled({ 'cat': cat, 'downloads': downloads })).insertAfter( container );
    // keep a ref so we can toggle if already open
    catRef = cat
  } else {
    // reset if it was a close event
    catRef = null
  }
})
