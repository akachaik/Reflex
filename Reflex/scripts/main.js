(function ($) {
    skel.breakpoints({
        xlarge: '(max-width: 1680px)',
        large: '(max-width: 1280px)',
        medium: '(max-width: 980px)',
        small: '(max-width: 736px)',
        xsmall: '(max-width: 480px)',
        xxsmall: '(max-width: 360px)'
    });
    $(function () {
        var $window = $(window), $body = $('body');
        $body.addClass('is-loading');
        $window.on('load', function () { window.setTimeout(function () { $body.removeClass('is-loading'); }, 100); });
        $('form').placeholder();
        skel.on('+medium  -medium',
            function () { $.prioritize('.important\\28  medium\\29', skel.breakpoint('medium').active); });
        var $menu = $('#menu'), $menuInner;
        $menu.wrapInner('<div  class="inner"></div>');
        $menuInner = $menu.children('.inner');
        $menu._locked = false;
        $menu._lock = function () {
            if ($menu._locked) return false;
            $menu._locked = true;
            window.setTimeout(function () { $menu._locked = false; }, 350);
            return true;
        };
        $menu._show = function () { if ($menu._lock()) $menu.addClass('visible'); };
        $menu._hide = function () { if ($menu._lock()) $menu.removeClass('visible'); };
        $menu._toggle = function () { if ($menu._lock()) $menu.toggleClass('visible'); };
        $menuInner.on('click', function (event) { event.stopPropagation(); }).on('click',
            'a',
            function (event) {
                var href = $(this).attr('href');
                event.preventDefault();
                event.stopPropagation();
                $menu._hide();
                window.setTimeout(function () { window.location.href = href; }, 250);
            });
        $menu.appendTo($body).on('click',
            function (event) {
                event.stopPropagation();
                event.preventDefault();
                $menu.removeClass('visible');
            }).append('<a  class="close" href="#menu">Close</a>');
        $body.on('click',
            'a[href="#menu"]',
            function (event) {
                event.stopPropagation();
                event.preventDefault();
                $menu._toggle();
            }).on('click', function (event) { $menu._hide(); })
            .on('keydown', function (event) { if (event.keyCode == 27) $menu._hide(); });
    });
})(jQuery);

(function ($) {
    $(function () {
        if (skel.vars.os == 'ios' && window.self !== window.top) {
            var $menu = $('#menu'), $window = $(window.top), $head = $('head'), x;
            $window.on('resize  orientationchange',
                function () { $menu.css('width', $window.width()).css('height', $window.height()); })
                .trigger('resize');
            x = Math.max($window.width(), $window.height()) * 3;
            $head.append('<style>#menu.visible:before  { top: ' +
                (x * -0.5) +
                'px !important;  right: ' +
                (x * -0.5) +
                ' !important;  width: ' +
                x +
                'px !important;  height: ' +
                x +
                'px !important;  }</style>');
        }
    });
})(jQuery);


