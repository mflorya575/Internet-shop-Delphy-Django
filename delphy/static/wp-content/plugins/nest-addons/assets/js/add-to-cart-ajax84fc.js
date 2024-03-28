/*
Add to cart js
*/
(function ($) {
    "use strict";
    jQuery(function($) {
        var noticesHtml;
        
        $(document).on('click', 'a.ajax_add_to_cart', function(e){
            e.preventDefault();
            var $thisbutton = $(this);
            var formData = new FormData();
            formData.append('add-to-cart', $thisbutton.attr( 'data-product_id' ));
            $( document.body ).trigger( 'adding_to_cart', [ $thisbutton, formData ] );
            $.ajax({
                url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'ace_add_to_cart' ),
                data: formData, 
                security: nest_cart_action_nonce.nonce, 
                type: 'POST',
                processData: false,
                contentType: false,
                complete: function( response ) {
                    response = response.responseJSON;
                    if ( ! response ) {
                        return;
                    }
                    if ( response.error && response.product_url ) {
                        window.location = response.product_url;
                        return;
                    }
                    if ( wc_add_to_cart_params.cart_redirect_after_add === 'yes' ) {
                        window.location = wc_add_to_cart_params.cart_url;
                        return;
                    }
                    $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisbutton ] );
                    noticesHtml = response.fragments.notices_html;
                    $(noticesHtml).appendTo('.cart_notice').delay(200).fadeOut(5000, function(){
                        $(this).remove();
                    });
                    $('.cartnotice_close').on('click', function(){
                        $(this).closest('.woocommerce-message, .woocommerce-error').remove();
                    });
                },
                dataType: 'json'
            });
        }); 
        
    });  
    
      
    // single add to cart
    jQuery(document).on('ready', function () {
        $('.product:not(.product-type-external) form.cart , .sticky_sigle_add_to_cart  form.cart').on('submit', function(e) {
            e.preventDefault();
            var form = $(this);
            var formData = new FormData(form[0]);
            formData.append('add-to-cart', form.find('[name=add-to-cart]').val() ); 
            $.ajax({
                url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'ace_add_to_cart' ),
                data: formData,
                security: nest_cart_action_nonce.nonce, 
                type: 'POST',
                processData: false,
                contentType: false,
                complete: function( response ) {
                    response = response.responseJSON;
                    if(!response){
                        return;
                    }
                    if(response.error && response.product_url){
                        window.location = response.product_url;
                        return;
                    }
                    if (wc_add_to_cart_params.cart_redirect_after_add === 'yes'){
                        window.location = wc_add_to_cart_params.cart_url;
                        return;
                    }
                    var $thisbutton = form.find('.single_add_to_cart_button'); //
					//var $thisbutton = null; // uncomment this if you don't want the 'View cart' button
                    // Trigger event so themes can refresh other areas.
                    $( document.body ).trigger( 'added_to_cart', [ response.fragments, response.cart_hash, $thisbutton ] );
                    // Remove existing notices
                    $( '.woocommerce-error, .woocommerce-message, .woocommerce-info' ).remove();
                    // Add new notices
                    $(response.fragments.notices_html).appendTo('.cart_notice').delay(200).fadeOut(5000);
                    $('.woocommerce-message, .woocommerce-error').each(function() {
                        if (!$(this).find('.cartnotice_close').length) {
                          $(this).append('<div class="cartnotice_close"><i class="fas fa-times"></i></div>');
                        }
                      });
                    $('.cartnotice_close').on('click', function(){
                        $(this).closest('.woocommerce-message, .woocommerce-error').remove();
                    });
                }
            });
        });
    });

  

}(jQuery));
