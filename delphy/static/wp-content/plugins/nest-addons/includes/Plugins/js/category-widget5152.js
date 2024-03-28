(function($) {
    $(document).ready(function() {
        // Checkbox change event
        $(".category-filter-widget input[type='checkbox']").on("change", function() {
            applycategoryFilter();
        });

        // category Reset button click event
        $('.category-filter-buttons .reset-button').on('click', function (e) {
            e.preventDefault();
            var filterUrl = removeQueryStringParameter(window.location.href, 'category');
            window.location.href = filterUrl;
        });
        // Apply category filter
        function applycategoryFilter() {
            var selectedcategorys = $('input[name="category[]"]:checked').map(function() {
                return encodeURIComponent(this.value);
            }).get();

            // Remove duplicate categorys
            selectedcategorys = [...new Set(selectedcategorys)];

            var filterUrl = updateQueryStringParameter(window.location.href, 'category', selectedcategorys.join(','));

            // Remove previous category selection
            if (selectedcategorys.length === 0) {
                filterUrl = removeQueryStringParameter(filterUrl, 'category');
            }

            window.location.href = filterUrl;
        }

      
        // Helper function to update query string parameter
        function updateQueryStringParameter(url, key, value) {
            var baseUrl = url.split('?')[0];
            var urlParameters = url.split('?')[1];

            if (urlParameters) {
                var urlParams = new URLSearchParams(urlParameters);
                urlParams.set(key, value);
                return baseUrl + '?' + urlParams.toString();
            } else {
                return baseUrl + '?' + key + '=' + value;
            }
        }

      // Helper function to remove query string parameter
      function removeQueryStringParameter(url, key) {
        var urlParts = url.split('?');
        if (urlParts.length >= 2) {
            var prefix = encodeURIComponent(key) + '=';
            var params = urlParts[1].split(/[&;]/g);
            var updatedParams = [];

            for (var i = 0; i < params.length; i++) {
                var param = params[i];
                var paramParts = param.split('=');
                var paramName = decodeURIComponent(paramParts[0]);

                if (paramName === key) {
                    continue;
                }

                updatedParams.push(param);
            }

            url = urlParts[0] + (updatedParams.length > 0 ? '?' + updatedParams.join('&') : '');
        }
        return url;
    }
    });
})(jQuery);
