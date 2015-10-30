'use strict';

var app = (function (document) {
	var docElem = document.documentElement,
		_userAgentInit = function () {
			docElem.setAttribute('data-useragent', navigator.userAgent);
		},
		_scrollStyle = function(){
			$('.copy-terms, .copy-privacy, .info').mCustomScrollbar();
		},
		_slick = function () {
			$('.slides').slick({
				dots: false,
				infinite: true,
				speed: 1000,
				fade: true,
				cssEase: 'linear',
				autoplay: false
			});
		},
		_resize = function () {
			$(window).resize(function () {
				_moveElements();
			});
		},
		_moveElements = function () {

			if ($(window).width() < 640) {

				$('.move-box').append($('.home .video span'));
				$('.btn_footer').append($('.brochure'));
				$('.box-info-small-history').append($('#box-info-small-history'));
				$('.box-info-small-about').append($('#box-info-small-about'));
				$('.box-info-small-documentary').append($('#box-info-small-documentary'));
				$('.box-video-small-documentary').append($('#box-video-small-documentary'));
				$('.box-info-small-restoration').append($('#box-info-small-restoration'));
				$('.box-info-small-sustainability').append($('#box-info-small-sustainability'));
				$('#cuestion_chosen').css({
					'width': '100%',
					'padding': '0'
				});

			}
			if ($(window).width() < 1000) {

				$('.thumb-video-history-medium').append($('.thumb-video-history'));
				$('.title-filo-move-medium').append($('.title-filosofia-medium'));
				$('.copy-restoration-medium').append($('#copy-restoration-medium'));
				$('.copy-sustainability-medium').append($('#copy-sustainability-medium'));
				$('.copy-energy-medium').append($('#copy-energy-medium'));
				$('#giglio-greene-medium').append($('.parallax-right'));
				$('#giglio-white-medium').append($('.parallax-left'));
				$('.box-210-medium-greene').append($('#box-210-medium-greene'));
				$('.box-210-medium-white').append($('#box-210-medium-white'));

			}
		},
		_validate = function () {

			$('#contact-form').validate({
				rules: {
					firstName: 'required',
					lastName: 'required',
					message: 'required',
					email: 'required'
				},
				messages: {
					firstName: 'REQUIRED FIELD',
					lastName: 'REQUIRED FIELD',
					message: 'REQUIRED FIELD',
					email: 'PLEASE ENTER A VALID EMAIL ADDRESS'
				},
				errorPlacement: function (error, element) {

					$('.text-required').html(error.text()).css('color', '#ff2940');
					$('input').css('margin', '0 0 15px 0');

					if (element.attr('name') === 'email') {
						$('#email').attr('placeholder', 'JCONNOR@GMAIL.COM');
					}
				},
				highlight: function (element, errorClass, validClass) {

					$(element).addClass(errorClass).removeClass(validClass);

				},
				unhighlight: function (element, errorClass, validClass) {

					$(element).removeClass(errorClass).addClass(validClass);
					$('.text-required').html('');

				},
				submitHandler: function (form) {
					var ajaxurl = 'contact.php';
					$.post(ajaxurl, $(form).serialize(), function () {

						$('#thank').foundation('reveal', 'open');
						$('.close-reveal-modal').on('click', function () {

							$('.text-required').html('');
							$('.chosen-select').val('').trigger('chosen:updated');
							form.reset();
						});
					});

				}

			});
		},
		_chosen_config = function () {

			$('.chosen-select').chosen({
				disable_search_threshold: 10
			});
		},
		_skllor = function () {

			var s;
			var width = $(window).width();

			if ((/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera) && width < 1000) {

				s = skrollr.init();
				s.destroy();

			} else {

				if ($(window).width() > 1000) {

					s =  skrollr.init({          
							forceHeight: false,
							
							mobileCheck: function() {
							    return false;
							}
					});

					skrollr.menu.init(s, {
						//skrollr will smoothly animate to the new position using `animateTo`.
						animate: true,

						//The easing function to use.
						easing: 'sqrt',

						//How long the animation should take in ms.
						duration: function () {
							//By default, the duration is hardcoded at 500ms.
							return 1500;

							//But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
							//return Math.abs(currentTop - targetTop) * 10;
						}
					});

				}
			}
		},
		_map = function () {

			if ($('.map-script').length) {
				// Load Gmaps only when is necessary
				var script_tag = document.createElement('script');
				script_tag.type = 'text/javascript';
				script_tag.src = '//maps.googleapis.com/maps/api/js?sensor=false&callback=app.map';
				document.body.appendChild(script_tag);
			}
		},
		_loadmap = function () {
			//var google = google;
			if ($('#map-white').length) {
				var punto1 = new google.maps.LatLng(40.7185, -74.003523);

				var mapSettings1 = {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 15,
					center: punto1,
					disableDefaultUI: true
				};

				var mapStyles1 = [
					{
						'featureType': 'all',
						'elementType': 'all',
						'stylers': [
							{
								'saturation': -100
							},
							{
								'lightness': -6
							}
				        ]
				    }
				];

				var mapWhite = new google.maps.Map(document.getElementById('map-white'), mapSettings1);

				mapWhite.setOptions({
					styles: mapStyles1
				});

				var image = $('#map-marker1').attr('src');


				var marker1;

				marker1 = new google.maps.Marker({
					map: mapWhite,
					position: punto1,
					icon: image
				});
			}
			if ($('#map-greene').length) {

				var punto = new google.maps.LatLng(40.7213832, -74.0023442);

				var mapSettings = {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 15,
					center: punto,
					disableDefaultUI: true
				};

				var mapStyles = [
					{
						'featureType': 'all',
						'elementType': 'all',
						'stylers': [
							{
								'saturation': -100
							},
							{
								'lightness': -6
							}
				        ]
				    }
				];

				var mapGreene = new google.maps.Map(document.getElementById('map-greene'), mapSettings);

				mapGreene.setOptions({
					styles: mapStyles
				});

				var image1 = $('#map-marker').attr('src');


				var marker;

				marker = new google.maps.Marker({
					map: mapGreene,
					position: punto,
					icon: image1
				});
			}


		},
		_init = function () {
			$(document).foundation({
			    reveal : {
					close_on_background_click : false,
					close_on_esc : false,
					dismiss_modal_class : 'close-reveal-modal',
					multiple_opened : false,
					bg_class : 'reveal-modal-bg',
					root_element : 'body',
					open : function(){

						$('body, html').css({'overflow':'hidden'});
						$('.flex-video').html(' <iframe src="https://player.vimeo.com/video/127152877" width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
					},
					opened : function(){

						$('.reveal-modal').css('top', '12.5%');
						if ($(window).width() <= 640) {
							$('.reveal-modal').css('top', '0');
						}
					},
					close : function(){

						$('.flex-video iframe').remove();
						$('body, html').css({'overflow':''});
					},
					closed : function(){
						
						$('.flex-video iframe').remove();
					}
			    },
				offcanvas : {
					// Sets method in which offcanvas opens.
					// [ move | overlap_single | overlap ]
					open_method: 'overlap', 
					// Should the menu close when a menu link is clicked?
					// [ true | false ]
					close_on_click : false
				}
			});
			$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
				$('.right-off-canvas-menu').css({'position':'fixed'});						
			});
			_userAgentInit();
			_map();
			_chosen_config();
			_validate();
			_moveElements();
			_resize();
			_slick();
			_skllor();
			_scrollStyle();

		};
	return {
		init: _init,
		map: _loadmap
	};
})(document, jQuery);

(function () {
	app.init();
})();