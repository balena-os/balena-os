if ($('.FAQs').length) {
  const container = $('.FAQs-js')
  const html = container.data('html');
  var delimitedHtml = html.replace(/<h2>/gi, "<$delimiter><h2>");

  $(delimitedHtml.split('<$delimiter>')).each(function(index){
    var q = $('<div class="FAQ">'+ this +'</div>')
    header = q.find('h2')

    $('<div class="pull-xs-right"><div class="FAQ__expander fa-stack fa"><i class="fa fa-circle fa-stack-1x"></i><i class="fa fa-plus-circle fa-stack-2x FAQ-js-target" aria-hidden="true"></i></div></div>').appendTo( header )

    // mixpanel tracking meta
    var trackMeta = {
      "title": header.text()
    }

    header.wrap('<a class="FAQ__header" data-toggle="collapse" data-track="FAQ view" data-track-meta=' + JSON.stringify(trackMeta) + ' href="#faq-' + index + '"/>')

    q.children('*').not('.FAQ__header').wrapAll('<div id="faq-' + index +  '" class="FAQ__content panel-collapse collapse" aria-expanded="true"/>')

    container.append(q)
  })

  function switchClass(element, activeClass, inactiveClass) {
    element.removeClass(activeClass)
    element.addClass(inactiveClass)
  }

  $(".FAQ__header").click(function(){
    toggleIcon = $(this).find('.FAQ-js-target')
    if(toggleIcon.hasClass("fa-plus-circle")) {
      switchClass(toggleIcon, 'fa-plus-circle', 'fa-minus-circle')
    } else {
      switchClass(toggleIcon, 'fa-minus-circle', 'fa-plus-circle')
    }
  })
}
