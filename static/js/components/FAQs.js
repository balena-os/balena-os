if ($('.FAQs').length) {
  const container = $('.FAQs-js')
  const html = container.data('html');
  var delimitedHtml = html.replace(/<h2>/gi, "<$delimiter><h2>");

  $(delimitedHtml.split('<$delimiter>')).each(function(index){
    var q = $('<div class="FAQ">'+ this +'</div>')
    header = q.find('h2')
    $('<i class="fa fa-plus-circle pull-xs-right" aria-hidden="true"></i>').appendTo( header )
    header.wrap('<a class="FAQ__header" data-toggle="collapse" href="#faq-' + index + '"/>')
    q.children('*').not('.FAQ__header').wrapAll('<div id="faq-' + index +  '" class="FAQ__content panel-collapse collapse" aria-expanded="true"/>')
    container.append(q)
  })

  function switchClass(element, activeClass, inactiveClass) {
    element.removeClass(activeClass)
    element.addClass(inactiveClass)
  }

  $(".FAQ__header").click(function(){
    toggleIcon = $(this).find('.fa')
    if(toggleIcon.hasClass("fa-plus-circle")) {
      switchClass(toggleIcon, 'fa-plus-circle', 'fa-minus-circle')
    } else {
      switchClass(toggleIcon, 'fa-minus-circle', 'fa-plus-circle')
    }
  })
}
