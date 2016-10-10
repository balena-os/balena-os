var _ = require('lodash')
var text = $('#downloads__wellTmpl').html()
var compiled = _.template(text, { 'imports': { 'jq': jQuery } })
var catRef = null
var caretOffsetRef = null

if ($('#downloads').length) {
  $(".downloads__category").click(function(){
    var cat = $(this).data('cat')
    var catId = cat.title.replace(/ /g, '').toLowerCase()
    console.log(cat )
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

    if (catId != catRef) {
      $(this).addClass('downloads__category--active')
      $(compiled({ 'catId': catId,'catTitle': cat.title, 'downloads': cat.links })).insertAfter( container )
      // keep a ref so we can toggle if already open
      catRef = catId
    } else {
      // reset if it was a close event
      $(this).removeClass('downloads__category--active')
      catRef = null
    }
  })

  $('body').on('DOMNodeInserted', '.downloads__well', function () {
    alignCaret(this)
  });

  function alignCaret(that) {
    var caret = $(that).find('.downloads__well__caret')
    caret.css('left', caretOffsetRef)
    var target = $('.downloads__category--active')
    var containerMargin = $('.downloads__well').offset().left
    var offset = target.offset().left - containerMargin + (target.width()/2.2)
    caret.css('left', offset)
    caretOffsetRef = offset
  }

  $( window ).resize(function() {
    if ($('.downloads__well')) {
      alignCaret('.downloads__well')
    }
  });
}
