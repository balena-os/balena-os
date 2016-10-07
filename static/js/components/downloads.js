var _ = require('lodash')
var text = $('#downloads__wellTmpl').html()
var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
var catRef = null;
var caretOffsetRef = null;
$(".downloads__category").click(function(){
  var downloads = $(this).data('downloads')
  var cat = $(this).data('cat')
  if ($('.downloads__well')) {
    $('.downloads__well').remove()
    $('.downloads__category--active').removeClass('downloads__category--active')
  }
  $(this).toggleClass('downloads__category--active')
  if($(window).width() < 767) {
    // if mobile drop immediately below item
    var container = $(this)
  } else {
    var container = $(this).closest('.downloads__row')
  }

  if (cat != catRef) {
    $(this).addClass('downloads__category--active')
    $(compiled({ 'cat': cat, 'downloads': downloads })).insertAfter( container )
    // keep a ref so we can toggle if already open
    catRef = cat
  } else {
    // reset if it was a close event
    $(this).removeClass('downloads__category--active')
    catRef = null
  }
})

$('body').on('DOMNodeInserted', '.downloads__well', function () {
  //$(this).combobox();
  // set cat first so transition can take place
  var caret = $(this).find('.downloads__well__caret')
  caret.css('left', caretOffsetRef)
  var target = $('.downloads__category--active')
  var offset = target.offset().left + 15
  caret.css('left', offset)
  caretOffsetRef = offset
});
