// quick view
// examples https://api.jquery.com/event.preventdefault/
// https://codex.wordpress.org/AJAX_in_Plugins
    
jQuery(document).ready(function($) {
"use strict";
$("a.nest_quick_view_btn").click(function(event) {
        event.preventDefault(); 
        var data = {
            action: 'nest_get_quick_view',
            'id': $(this).attr('href'),
            beforeSend: function() {
                $('.quick_view_loading').addClass('loading');
            },
        };
        $.post(NestAjax.ajaxurl, data, function(response) {
            $.magnificPopup.open({
            type: 'inline',
            preloader: true,
            // Delay in milliseconds before
            // popup is removed
            removalDelay: 160,
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            },
            mainClass: 'my-mfp-zoom-in',
                items: {
                    src: response
                }
            })
            $('.quick_view_loading').removeClass('loading');
            $('body').addClass('quickview_enable');
            
            var owl = $('.product-image-slider');
            owl.owlCarousel({
                autoplay: true,
                autoplayTimeout: 4000,
                loop: true,
                dots: false,
                items: 1,
                center: true,
                nav: false,
                thumbs: true,
                thumbImage: false,
                thumbsPrerendered: true,
                thumbContainerClass: 'owl-thumbs',
                thumbItemClass: 'owl-thumb-item'
            });
            $("#rating").select2("destroy");
            $('.quick_view .mfp-close').on('click', function() {
                $('.quick_view').css('opacity', 0);
            });

            $('.quick_view_tab_content').each(function () {
                var $tabContainer = $(this);
                $tabContainer.find('.showcase_tabs_btns .s_tab_btn').on('click', function (e) {
                    e.preventDefault();
                    var target = $($(this).attr('data-tab'));
                    if ($(target).hasClass('active-tab show')) {
                        return !1
                    } else {
                        $tabContainer.find('.showcase_tabs_btns .s_tab_btn').removeClass('active');
                        $(this).addClass('active');
                        $tabContainer.find('.s_tabs_content .s_tab').removeClass('active-tab show');
                        $(target).addClass('active-tab show');
                    }
                })
            });
        
            $("select").select2();
            
            $('.product:not(.product-type-external) form.cart').on('submit', function(e) {
                e.preventDefault();
                var form = $(this);
                var formData = new FormData(form[0]);
                formData.append('add-to-cart', form.find('[name=add-to-cart]').val() );
                $.ajax({
                    url: wc_add_to_cart_params.wc_ajax_url.toString().replace( '%%endpoint%%', 'ace_add_to_cart' ),
                    data: formData,
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
                        $(response.fragments.notices_html).appendTo('.cart_notice').delay(3000).fadeOut(300);
                    }
                });
            });
        });
    }); 
});