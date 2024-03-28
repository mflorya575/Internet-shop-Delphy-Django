(function($){
    "use strict";
    function productSearch(form, query, currentQuery, timeout) {
        var search = form.find('.search'),
            category = form.find('.category');
        
        form.next('.searchresultsget').html('').removeClass('active');
        query = query.trim();
        if (query.length >= 3) {
            if (timeout) {
                clearTimeout(timeout);
            }
            form.next('.searchresultsget').removeClass('empty');
            search.parent().addClass('loading');
            if (query != currentQuery) {
                timeout = setTimeout(function() {
                    $.ajax({
                        url: opt.ajaxUrl,
                        type: 'post',
                        data: { action: 'search_product', keyword: query, category: category.val() },
                        success: function(data) {
                            currentQuery = query;
                            search.parent().removeClass('loading');
                            if (!form.next('.searchresultsget').hasClass('empty')) {
                                if (data.length) {
                                    form.next('.searchresultsget').html('<ul>'+data+'</ul>').addClass('active');
                                } else {
                                    form.next('.searchresultsget').html(opt.noResults).addClass('active');
                                }
                            }
                            clearTimeout(timeout);
                            timeout = false;
                        }
                    });
                }, 500);
            }
        } else {
            search.parent().removeClass('loading');
            form.next('.searchresultsget').empty().removeClass('active').addClass('empty');
            clearTimeout(timeout);
            timeout = false;
        }
    }
    
    $('form[name="product-search"]').each(function(){
        var form = $(this),
            search = form.find('.search'),
            category = form.find('.category'),
            currentQuery = '',
            timeout = false;
    
        category.on('change',function(){
            currentQuery = '';
            var query = search.val();
            productSearch(form, query, currentQuery, timeout);
        });
    
        search.keyup(function(){
            var query = $(this).val();
            productSearch(form, query, currentQuery, timeout);
        });
    
        form.submit(function(event){
            event.preventDefault();
            var query = search.val(),  
                getvalse = '';
                 
                if (typeof (query) != 'undefined' && query.length) {
                    getvalse = '&s=' + encodeURIComponent(query);
                }
                var url = '?post_type=product' +  getvalse;
                window.location.href = url;
                console.log(selectedCategory);
        });
    });
    
})(jQuery);
