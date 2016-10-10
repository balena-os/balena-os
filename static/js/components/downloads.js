var _ = require('lodash')
var text = $('#downloads__wellTmpl').html()
var compiled = _.template(text, { 'imports': { 'jq': jQuery } })
var catRef = null
var caretOffsetRef = null

function openWell(that) {
  var cat = $(that).data('cat')
  var catId = cat.title.replace(/ /g, '').toLowerCase()
  if ($('.downloads__well')) {
    $('.downloads__well').remove()
    $('.downloads__category--active').removeClass('downloads__category--active')
  }
  $(that).toggleClass('downloads__category--active')
  if($(window).width() < 767) {
    // if mobile drop immediately below item
    var container = $(that)
  } else {
    var container = $(that).closest('.downloads__row')
  }

  if (catId != catRef) {
    $(that).addClass('downloads__category--active')
    $(compiled({ 'catId': catId,'catTitle': cat.title, 'downloads': cat.links })).insertAfter( container )
    // keep a ref so we can toggle if already open
    catRef = catId
  } else {
    // reset if it was a close event
    $(that).removeClass('downloads__category--active')
    catRef = null
  }
}

function alignCaret(that) {
  var caret = $(that).find('.downloads__well__caret')
  caret.css('left', caretOffsetRef)
  var target = $('.downloads__category--active')
  var containerMargin = $('.downloads__well').offset().left
  var offset = target.offset().left - containerMargin + (target.width()/2.2)
  caret.css('left', offset)
  caretOffsetRef = offset
}

if ($('#downloads').length) {
  $(".downloads__category").click(function(){
    openWell(this)
  })

  $('body').on('DOMNodeInserted', '.downloads__well', function () {
    //
    alignCaret(this)
  });

  $( window ).resize(function() {
    // recalc position when browser changed
    if ($('.downloads__well')) {
      alignCaret('.downloads__well')
    }
  });

  if(window.location.hash.indexOf('downloads-') !== -1) {
    catId = window.location.hash.split('-')[1]
    openWell('#downloads-' + catId)
  }
}
