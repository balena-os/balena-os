(function($) {
  if ($('.FAQs').length) {
    var switchClass = function(element, activeClass, inactiveClass) {
      element.removeClass(activeClass)
      element.addClass(inactiveClass)
      return element
    }

    $(".FAQ__header").click(function(){
      toggleIcon = $(this).find('.FAQ-js-target')
      toggleIcon.toggleClass('fa-plus-circle fa-minus-circle')
    })
  }
})(jQuery)
