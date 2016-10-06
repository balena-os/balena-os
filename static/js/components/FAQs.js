if ($('.FAQs').length) {
  const container = $('.FAQs-js')
  const html = container.data('html');
  var delimitedHtml = html.replace(/<h2>/gi, "<$delimiter><h2>");
  $(delimitedHtml.split('<$delimiter>')).each(function(index){
    var q = $('<div class="FAQ">'+ this +'</div>')
    header = q.find('h2')
    header.wrap('<a class="FAQ__header" data-toggle="collapse" href="#faq-' + index + '"/>')
    q.children('*').not('.FAQ__header').wrapAll('<div id="faq-' + index +  '" class="FAQ__content panel-collapse collapse" aria-expanded="true"/>');
    container.append(q)
  })
}
