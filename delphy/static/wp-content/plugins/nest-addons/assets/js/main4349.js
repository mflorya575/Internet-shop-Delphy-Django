/*==================================================
                    Nest Theme Js
==================================================*/
(function ($) {
    ("use strict");
    // Page loading
    $(window).on("load", function () { 
        $("#onloadModal").modal("show");
    });
    document.onreadystatechange = function () {
        var state = document.readyState;
        if (state == 'interactive') {
            var preloaderActive = document.getElementById('preloader-active');
            if (preloaderActive) {
                preloaderActive.style.visibility = "visible"
            }
        } else if (state == 'complete') {
            setTimeout(function () {
                var preloaderActive = document.getElementById('preloader-active');
                if (preloaderActive) {
                    preloaderActive.style.visibility = "hidden"
                }
            }, 300)
        }
    };
    /*-----------------
        ScrollUp
    -----------------*/    
    var btn = $('.scrollUp');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
        btn.removeClass('show');
        }
    });
    btn.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    }); 
    var mobileheader = $('.mobile_floating_menu');
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            mobileheader.addClass('show');
        } else {
            mobileheader.removeClass('show');
        }
    }); 
    /*-----------------
        sidebar sticky
    -----------------*/ 
    if($(".sticky-sidebar").length) {
        $(".sticky-sidebar").theiaStickySidebar();
    }
    /*-----------------
    Hero slider 1
    -----------------*/ 
    function nest_slider_one() {
        // banner-carousel
        if ($('.hero-slider-1').length) {
            $('.hero-slider-1').owlCarousel({
                loop:false,
                margin:10,
                nav:true,
                dots:true,
                autoplayHoverPause:true ,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                thumbs: false,
                active: true,
                autoHeight:true,
                smartSpeed: 1000,
                autoplay: 6000,
                navText: [ '<span class="slider-btn slider-prev"><i class="fi-rs-angle-left"></i></span>', '<span class="slider-btn slider-next"><i class="fi-rs-angle-right"></i></span>' ],
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:1
                    },
                    800:{
                        items:1
                    },
                    1024:{
                        items:1
                    }
                }
        });
        }}


        /*-----------------
    Hero slider 1
    -----------------*/ 
    function nest_product_single_slider() {
        // banner-carousel
        if ($('.product-image-slider').length) {
            $('.product-image-slider').owlCarousel({
                autoplay: true,
                autoplayTimeout: 4000,
                loop: true,
                items: 1,
                center: true,
                nav: false,
                thumbs: true,
                thumbImage: false,
                dots: false,
                thumbsPrerendered: true,
                thumbContainerClass: 'owl-thumbs',
                thumbItemClass: 'owl-thumb-item'
            });
        }
    }


    /*-----------------------------
            Theme Carousel
    -----------------------------*/
    function nest_theme_owl_carousel() {
        if ($('.theme_carousel').length) {
                $(".theme_carousel").each(function (index) {
                var $owlAttr = {
                    thumbs: false,
                    animateOut: 'slideOut',
                    animateIn: 'slideIn',
                    navText: [ '<i class="fi-rs-arrow-small-left"></i>', '<i class="fi-rs-arrow-small-right"></i>' ],
                },
                $extraAttr = $(this).data("options");
                $.extend($owlAttr, $extraAttr);
                $(this).owlCarousel($owlAttr);
                
            });
        }
    } 
    function nest_tabtwo() {
        if ($('.product-tabs_two').length) {
            $('.product-tabs_two .nav-tabs .nav-link').on('click', function(e) {
                e.preventDefault();
                
                var header = $('.product-tabs_two .s_tabs_content .tab-pane .theme_carousel');
            
                header.addClass('loading');
                setTimeout(function() {
                    header.removeClass('loading');
                }, 1000);
            }); 
        }
    }
    /*-----------------------------
            Timer Countdown
    -----------------------------*/
    function nest_deals() {
    $("[data-countdown]").each(function () {
        var $this = $(this),
        finalDate = $(this).data("countdown");
        $this.countdown(finalDate, function (event) {
            $(this).html(event.strftime("" + '<span class="countdown-section"><span class="countdown-amount hover-up">%D</span><span class="countdown-period days">  </span></span>' + '<span class="countdown-section"><span class="countdown-amount hover-up">%H</span><span class="countdown-period hours">  </span></span>' + '<span class="countdown-section"><span class="countdown-amount hover-up">%M</span><span class="countdown-period mins">  </span></span>' + '<span class="countdown-section"><span class="countdown-amount hover-up">%S</span><span class="countdown-period sec">  </span></span>'));
        });
    });
    }
    /*-----------------------------
            Category toggle function
    -----------------------------*/ 
    var searchToggle = $(".categories-button-active");
    searchToggle.on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).siblings(".categories-dropdown-active-large").removeClass("open");
        } else {
            $(this).addClass("open");
            $(this).siblings(".categories-dropdown-active-large").addClass("open");
        }
    }); 
    /*-------------------------------
            Sort by active
    -----------------------------------*/
    if ($(".sort-by-product-area").length) {
        var $body = $("body"),
            $cartWrap = $(".sort-by-product-area"),
            $cartContent = $cartWrap.find(".sort-by-dropdown");
        $cartWrap.on("click", ".sort-by-product-wrap", function (e) {
            e.preventDefault();
            var $this = $(this);
            if (!$this.parent().hasClass("show")) {
                $this.siblings(".sort-by-dropdown").addClass("show").parent().addClass("show");
            } else {
                $this.siblings(".sort-by-dropdown").removeClass("show").parent().removeClass("show");
            }
        });
        /*Close When Click Outside*/
        $body.on("click", function (e) {
            var $target = e.target;
            if (!$($target).is(".sort-by-product-area") && !$($target).parents().is(".sort-by-product-area") && $cartWrap.hasClass("show")) {
                $cartWrap.removeClass("show");
                $cartContent.removeClass("show");
            }
        });
    } 
/*-----------------------
    Shop filter active 
------------------------- */
    $(".shop-filter-toogle").on("click", function (e) {
        e.preventDefault();
        $(".shop-product-fillter-header").slideToggle();
    });
    var shopFiltericon = $(".shop-filter-toogle");
    shopFiltericon.on("click", function () {
        $(".shop-filter-toogle").toggleClass("active");
    });

    /*-------------------------------------
        Product details big image slider
    ---------------------------------------*/
    if ($('.pro-dec-big-img-slider').length) {
    $(".pro-dec-big-img-slider").owlCarousel({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        thumbs: false,
        fade: false,
        asNavFor: ".product-dec-slider-small , .product-dec-slider-small-2"
    });
    }
/*---------------------------------------
    Product details small image slider
-----------------------------------------*/
    if ($('.product-dec-slider-small').length) {
    $(".product-dec-slider-small").owlCarousel({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: ".pro-dec-big-img-slider",
        dots: false,
        focusOnSelect: true,
        fade: false,
        thumbs: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    });
    } 
    /*-----------------------------
            SidebarSearch
    -----------------------------*/
    function sidebarSearch() {
    var searchTrigger = $(".search-active"),
        endTriggersearch = $(".search-close"),
        container = $(".main-search-active");
        searchTrigger.on("click", function (e) {
            e.preventDefault();
            container.addClass("search-visible");
        });

        endTriggersearch.on("click", function () {
            container.removeClass("search-visible");
        });
    }
    sidebarSearch();
    /*-----------------------------
            Sidebar menu Active
    -----------------------------*/
    function mobileHeaderActive() {
        var navbarTrigger = $(".burger-icon"),
            endTrigger = $(".mobile-menu-close"),
            container = $(".mobile-header-active"),
            wrapper4 = $("body");
        wrapper4.prepend('<div class="body-overlay-1"></div>');
        navbarTrigger.on("click", function (e) {
            e.preventDefault();
            container.addClass("sidebar-visible");
            wrapper4.addClass("mobile-menu-active");
        });
        endTrigger.on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
        });

        $(".body-overlay-1").on("click", function () {
            container.removeClass("sidebar-visible");
            wrapper4.removeClass("mobile-menu-active");
        });
    }
    mobileHeaderActive();

    /*-------------------------
        Mobile menu active
    ------------------------ */
    var $offCanvasNav = $(".mobile-menu"),
        $offCanvasNavSubMenu = $offCanvasNav.find(".sub-menu");

    /*Add Toggle Button With Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>');

    /*Close Off Canvas Sub Menu*/
    $offCanvasNavSubMenu.slideUp();

    /*Category Sub Menu Toggle*/
    $offCanvasNav.on("click", "li a, li .menu-expand", function (e) {
        var $this = $(this);
        if (
            $this
                .parent()
                .attr("class")
                .match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/) &&
            ($this.attr("href") === "#" || $this.hasClass("menu-expand"))
        ) {
            e.preventDefault();
            if ($this.siblings("ul:visible").length) {
                $this.parent("li").removeClass("active");
                $this.siblings("ul").slideUp();
            } else {
                $this.parent("li").addClass("active");
                $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                $this.closest("li").siblings("li").find("ul:visible").slideUp();
                $this.siblings("ul").slideDown();
            }
        }
    });

    /*--- language currency active ----*/
    $(".mobile-language-active").on("click", function (e) {
        e.preventDefault();
        $(".lang-dropdown-active").slideToggle(900);
    });

    /*--- categories-button-active-2 ----*/
    $(".categories-button-active-2").on("click", function (e) {
        e.preventDefault();
        $(".categori-dropdown-active-small").slideToggle(900);
    });

    /*--- Mobile demo active ----*/
    var demo = $(".tm-demo-options-wrapper");
    $(".view-demo-btn-active").on("click", function (e) {
            e.preventDefault();
            demo.toggleClass("demo-open");
    });
    /*-----------------------------
            light box
    -----------------------------*/
    function nest_light_box() {
        if ($('.lightbox-image').length) {
            $('.lightbox-image').fancybox({
                openEffect: 'fade',
                closeEffect: 'fade',
                helpers: {
                    media: {}
                }
            });
        }
    }
    /*-----------------------------
            VSticker
    -----------------------------*/
    function nest_news_flash(){
        if ($('.news-flash').length) {
            var swiper = new Swiper(".news-flash", {
                direction: "vertical",
                autoHeight: true,
                autoplay: {
                delay: 1500,
                disableOnInteraction: true,
                },
                slidesPerView: 1,
                pagination: false,
            });
        }
    }
    if($('.side_bar_cart').length){
        //Menu Toggle Btn
        $('.cart_mb , .mb_cart').on('click', function() {
        $('body').toggleClass('side_bar_cart-visible');
        });
        //Menu Toggle Btn
        $('.side_bar_cart  .close_btn_mini , .side_bar_cart .cart_overlay').on('click', function() {
        $('body').removeClass('side_bar_cart-visible');
        });
    }
    /*-----------------------------
            overflow
    -----------------------------*/
    function nest_product_description_overflow(){
    $(document).ready(function() {
        $('.list-features-six').each(function() {
        var listFeatures = $(this);
        if (listFeatures.height() > 100) {
            listFeatures.addClass('scrollbarcolor');
        }
        });
    });
    }
/* ==========================================================================
Elementor front end start
========================================================================== */
$(window).on('elementor/frontend/init', function() {
    // header v1
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-header-v1.default', nest_news_flash);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-extra-header-items-v1.default', nest_news_flash);
    // Slider v1
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-slider-v1.default', nest_slider_one);
    // Content v1 
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-brand-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-category-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-tab-filter-carousel-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-tab-filter-carousel-v1.default', nest_product_description_overflow);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-carousel-v1.default', nest_product_description_overflow);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-carousel-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-testimonial-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-blog-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-tab-filter-carousel-v1.default', nest_tabtwo);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-simple-image-box-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-simple-image-box-v1.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-deals-v2.default', nest_theme_owl_carousel);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-deals-v1.default', nest_deals);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-product-deals-v2.default', nest_deals);
    elementorFrontend.hooks.addAction('frontend/element_ready/nest-deals-v1.default', nest_deals);
});
    /*-----------------
        Menu Stick
    -----------------*/
    function nest_sidemenu_content_bx() {
        var header = $(".sidemenu_content_bx");
        $(window).scroll(function() {    
            var scroll = $(window).scrollTop();
            if (scroll >= 600) {
                header.addClass("scrolled");
            } else {
                header.removeClass("scrolled");
            }
        });
    }
    /*-----------------
        Menu Stick
    -----------------*/
    function nest_sidemenu() {
        if($(".sidemenu_area").length) {
            //adding a new class on button element
            $('#side_menu_toggle_btn').on('click',function () {
                $('body').addClass('side_menu_toggled');   
            });
            //removing a existing class from button element
            $('#side_menu_toggle_btn_close').on('click',function () {
                $('body').removeClass('side_menu_toggled');
            });
        }
    }

    /*-----------------
        Menu Stick
    -----------------*/
    function nest_filter_content() {
        if($("body").length) {
            //adding a new class on button element
            $('.nest_filter_btn').on('click',function () {
                $('body').addClass('nest_filter_side');   
            });
            //removing a existing class from button element
            $('.nest_filter_btn_close , .body-overlay-1').on('click',function () {
                $('body').removeClass('nest_filter_side');
            });
        }
    }
    /*-----------------
        Menu Stick
    -----------------*/
    function nest_headerStyle() {
		if($('.sticky_header_content').length){
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.sticky_header_content');
			var sticky_header = $('.sticky_header_content .sticky_header_default');
			if (windowpos > 500) {
				siteHeader.addClass('fixed-header');
				sticky_header.addClass("wow animate__animated animate__slideInDown");
			} else {
				siteHeader.removeClass('fixed-header');
				sticky_header.removeClass("wow animate__animated animate__slideInDown");
			}
		}
	}
    $(document).ready(function() {
        var CurrentUrl = document.URL;
        var CurrentUrlEnd = CurrentUrl.split('/').filter(Boolean).pop();
        console.log(CurrentUrlEnd);
        $(".wc-block-product-categories li a").each(function() {
            var ThisUrl = $(this).attr('href');
            var ThisUrlEnd = ThisUrl.split('/').filter(Boolean).pop();

            if (ThisUrlEnd == CurrentUrlEnd) {
                $(this).closest('.wc-block-product-categories li').addClass('current-cat-active')
            }
        });

    });


 
  
/* ==========================================================================
    When document is Scrollig, do
========================================================================== */
$(window).on('scroll', function() {
    nest_headerStyle();
});

$(window).on('load', function() {

    if($('.counters').length){
        $(".counters").counterUp({
            delay: 10,
            time: 2000
        });
    }

if ($('.slick_slider_one').length) {
    $('.slick_slider_one .flex-control-thumbs').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        adaptiveHeight: false ,
        arrows: true,
        prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
        nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
      
    });
}


if ($('.slick_slider_two').length) {
    $('.slick_slider_two .flex-control-thumbs').slick({
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        adaptiveHeight: false ,
        arrows: true,
        vertical:true,
        prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
        nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 4 ,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2 ,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
              }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
          ]
    });
}
 
//run when the DOM is ready
$(".single_add_to_cart_button").click(function() {  //use a class, since your ID gets mangled
      $(this).addClass("loading");      //add the class to the clicked element
});
    
});


$(window).load(function(){
    var $promain = $(".wc-block-product-categories-list--depth-0"),
    $pocat = $promain.find(".wc-block-product-categories-list");
    /*Add Toggle Button With Off Canvas Sub Menu*/
    $pocat.parent().prepend('<span class="menu-expand"><i class="fi-rs-angle-small-down"></i></span>');

       /*Category Sub Menu Toggle*/
       $promain.on("click", "li .menu-expand", function (e) {
        var $this = $(this);
        if ($this.hasClass("menu-expand")) {
            e.preventDefault();
            if ($this.siblings("ul:visible").length) {
                $this.parent("li").removeClass("active");
                $this.siblings("ul").slideUp();
            } else {
                $this.parent("li").addClass("active");
                $this.closest("li").siblings("li").removeClass("active").find("li").removeClass("active");
                $this.closest("li").siblings("li").find("ul:visible").slideUp();
                $this.siblings("ul").slideDown();
            }
        }
    });

});

 
function nest_magnificPopup() {
    $(document).ready(function() {
        $('.popup-video').magnificPopup({
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: true
        });
    });
}
document.addEventListener("DOMContentLoaded", function() {
    var stickySection = document.querySelector(".sticky_sigle_add_to_cart");
    var stickyTrigger = 750;

    function updateStickyState() {
        if (stickySection && window.scrollY > stickyTrigger) {
            stickySection.classList.add("sticky-cart");
        } else if (stickySection) {
            stickySection.classList.remove("sticky-cart");
        }
    }

    updateStickyState();
    window.addEventListener("scroll", updateStickyState);
});


 

/* ==========================================================================
    When document is Scrollig, do
========================================================================== */
    jQuery(document).on('ready', function () {
        (function ($) {
            // add your functions
            nest_slider_one();
            nest_news_flash();
            nest_theme_owl_carousel();
            nest_tabtwo();
            nest_light_box();
            nest_sidemenu_content_bx();
            nest_sidemenu();
            nest_product_single_slider(); 
            nest_deals()
            nest_magnificPopup();
            nest_filter_content();
            nest_product_description_overflow();
        
        })(jQuery);
    });
    $(window).load(function(){
        $(".widget  select").select2();
    });
 

})(jQuery);

