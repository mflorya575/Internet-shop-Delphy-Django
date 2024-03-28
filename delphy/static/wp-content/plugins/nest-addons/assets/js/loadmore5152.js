jQuery(function($) {
  "use strict";



  $('body').on('click', '.loadmoreproduct .woocommerce-pagination a', function(e) {
    e.preventDefault();
    if ($(this).data('requestRunning')) {
      return;
    }
    $(this).data('requestRunning', true);
    var $ser_post_list = $('ul.products'),
        $paginationser = $(this).parents('.loadmoreproduct .woocommerce-pagination'),
        $parent = $(this).parent();

    $parent.addClass('loader');

    $.get(
      $(this).attr('href'),
      function(response) {
        var $contentser = $(response).find('ul.products').children('.product'),
          ser_pagination = $(response).find('.loadmoreproduct .woocommerce-pagination').html();
       
         
        $paginationser.html(ser_pagination);
        $ser_post_list.append($contentser);
        if ($paginationser.find('a').length === 0) {
          $(".loadmoreproduct .woocommerce-pagination").addClass('donefinish');
        } else {
          $(".loadmoreproduct .woocommerce-pagination").removeClass('donefinish');
        }

        $contentser.imagesLoaded(function() {
          $contentser;
          $paginationser.find('.next').data('requestRunning', false);
          $parent.removeClass('loader');
        });
      }
    );
  });
 
});
