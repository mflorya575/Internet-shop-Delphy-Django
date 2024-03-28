(function($) {
    $(document).ready(function() {
        // Checkbox change event
        $(".brand-filter-widget input[type='checkbox']").on("change", function() {
            applyBrandFilter();
        });

        // Brand Reset button click event
        $('.brand-filter-buttons .reset-button').on('click', function (e) {
            e.preventDefault();
            var filterUrl = removeQueryStringParameter(window.location.href, 'brand');
            window.location.href = filterUrl;
        });
        // Apply brand filter
        function applyBrandFilter() {
            var selectedBrands = $('input[name="brand[]"]:checked').map(function() {
                return encodeURIComponent(this.value);
            }).get();

            // Remove duplicate brands
            selectedBrands = [...new Set(selectedBrands)];

            var filterUrl = updateQueryStringParameter(window.location.href, 'brand', selectedBrands.join(','));

            // Remove previous brand selection
            if (selectedBrands.length === 0) {
                filterUrl = removeQueryStringParameter(filterUrl, 'brand');
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
