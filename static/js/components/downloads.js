(function($) {
  var _ = require('lodash')
  var text = $('#downloads__wellTmpl').html()
  var compiled = _.template(text, { 'imports': { 'jq': jQuery } })
  var catRef = null
  var caretOffsetRef = null

  var getLatestVersion = (function() {
    var cache = {}

    return function(slug, callback) {
      if (cache.hasOwnProperty(slug)) {
        callback(null, cache[slug])
      }

      $.get('https://img.resin.io/api/v1/image/' + slug + '/versions', function(response) {
        var version = response.latest.replace(/\.prod/, '.dev');
        var url = 'https://files.resin.io/resinos/' + slug + '/' +
          encodeURIComponent(version) + '/image/resin.img.zip'
        var data = {
          version: version,
          url: url
        }
        cache[slug] = data
        callback(null, data)
      }).fail(function() {
        callback('Error retrieving latest OS version', null)
      })
    }
  }())

  var openWell = function(that) {
    var cat = $(that).data('cat')
    var catId = cat[0].family.replace(/ /g, '').toLowerCase()
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
      $(compiled({ 'catId': catId, 'catTitle': cat[0].family, 'downloads': cat })).insertAfter( container )

      // Load the latest version for each device type listed in this category
      cat.forEach(function(deviceType) {
        getLatestVersion(deviceType.id, function(err, data) {
          var $link = $('a.js-download-link[data-device-id="' + deviceType.id + '"]');
          if ($link.length) {
            $link.prev('i.fa-cog').hide()

            if (err) {
              $link.parent().append('<span class="error-message">' + err + '</span>')
            } else {
              $link.parent().find('.error-message').remove()
              $link.find('.os-label').text('resinOS ' + data.version)
              $link
                .attr('href', data.url)
                .show()
                .prev('i.fa-cog').hide()
            }
          }
        })
      })

      // keep a ref so we can toggle if already open
      catRef = catId
    } else {
      // reset if it was a close event
      $(that).removeClass('downloads__category--active')
      catRef = null
    }
  }

  var alignCaret = function(that) {
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

    $("body").on('click', '.js-download-link', function(){
      displayDocsLink(this)
    })

    $('body').on('DOMNodeInserted', '.downloads__well', function () {
      //
      alignCaret(this)
    });

    $( window ).resize(function() {
      // recalc position when browser changed
      if ($('.downloads__category--active').length) {
        alignCaret('.downloads__well')
      }
    });

    if(window.location.hash.indexOf('downloads-') !== -1) {
      catId = window.location.hash.split('-')[1]
      openWell('#downloads-' + catId)
    }
  }

  var displayDocsLink = function(that) {
    var slug = $(that).data('device-id');
    var name = $(that).data('device-name');
    $('.downloads__well__footer').show();
    $('.downloads__well__footer__link').attr('href', '/docs/' + slug + '/gettingstarted/').text('Get Started with the ' + name)
  }
})(jQuery);
