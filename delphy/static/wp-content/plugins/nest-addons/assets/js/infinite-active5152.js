jQuery(function($) {
    "use strict";
    if ($('body').length) {
    $('ul.products').infiniteScroll({
        // options
        path: '.scrollproduct .page-numbers .next',
        append: '.product',
        history: false,
        status: '.scroller-status',
        hideNav: '.page-numbers', 
    });
}
});