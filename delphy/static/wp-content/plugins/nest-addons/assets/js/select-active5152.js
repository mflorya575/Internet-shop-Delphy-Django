(function ($) {
    ("use strict");
    function nest_select2() {
        $("select").select2();
        // To unselect/select2
        $("#rating").select2("destroy");
        $(".multiple-brand-select").select2("destroy"); 
    }
    $(window).on('elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction('frontend/element_ready/nest-contact-form-v1.default', nest_select2);
    });
    jQuery(document).on('ready', function () {
        (function ($) {
            nest_select2();
        })(jQuery);
    });
})(jQuery);