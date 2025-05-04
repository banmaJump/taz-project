/*
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$menu = $('#menu'),
		$sidebar = $('#sidebar'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Menu.
		// $menu
		// 	.appendTo($body)
		// 	.panel({
		// 		delay: 500,
		// 		hideOnClick: true,
		// 		hideOnSwipe: true,
		// 		resetScroll: true,
		// 		resetForms: true,
		// 		side: 'right',
		// 		target: $body,
		// 		visibleClass: 'is-menu-visible'
		// 	});

		// $(document).ready(function() {
		// 	$menu = $('#menu');
		
		// 	$menu
		// 	.appendTo($body)
		// 	.panel({
		// 		delay: 500,
		// 		hideOnClick: true,
		// 		hideOnSwipe: true,
		// 		resetScroll: true,
		// 		resetForms: true,
		// 		side: 'right',
		// 		target: $body,
		// 		visibleClass: 'is-menu-visible'
		// 	});
		// });

	// Search (header).
		var $search = $('#search'),
			$search_input = $search.find('input');

		$body
			.on('click', '[href="#search"]', function(event) {

				event.preventDefault();

				if (!$search.hasClass('visible')) {
					// 要素の存在と型を確認
					if ($search.length > 0 && $search[0].tagName === 'FORM') {
						$search[0].reset();
					}
		
					$search.addClass('visible');
					$search_input.focus();
				}

			});

		$search_input
			.on('keydown', function(event) {

				if (event.keyCode == 27)
					$search_input.blur();

			})
			.on('blur', function() {
				window.setTimeout(function() {
					$search.removeClass('visible');
				}, 100);
			});

	// Intro.
		var $intro = $('#intro');

		// Move to main on <=large, back to sidebar on >large.
			breakpoints.on('<=large', function() {
				$intro.prependTo($main);
			});

			breakpoints.on('>large', function() {
				$intro.prependTo($sidebar);
			});

})(jQuery);