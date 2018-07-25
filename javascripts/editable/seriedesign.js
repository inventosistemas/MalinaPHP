(function ($) {
	$(function () {

		$('#footer div, #footer ul').contents().filter(function () {
			return this.nodeType == 3;
		}).remove();

		/*--------------------------------------------------------
			DROPDOWN
		--------------------------------------------------------*/
		$('.drop-toggle').on('click', function () {
			var element = $(this).siblings(".drop-content");
			if ($(this).hasClass('active')) {
				$(this).removeClass('active').siblings(element).removeClass('active');
			} else {
				$(this).addClass('active').siblings(element).addClass('active');
			}
		});

		/*--------------------------------------------------------
			FIXED HEADER
		--------------------------------------------------------*/
		var wWin = $(window).width();
		var hHeader = $('#header').height();

		$(window).on('resize', function () {
			wWin = $(window).width();
		});

		$(window).scroll(function () {
			hHeader = $('#header').height();
		});

		var nav = $('#fixed-header');
		$(window).scroll(function () {
			if ($(this).scrollTop() > hHeader) {
				nav.addClass("active");
			} else {
				nav.removeClass("active");
			}
		});

		/*--------------------------------------------------------
			MENU MOBILE
		--------------------------------------------------------*/
		$('.menu-mb').on('click', function () {
			var element = $(this).siblings(".menu-mb-content");
			if ($(this).hasClass('active')) {
				$('body').removeClass('menu-open');
				$(this).removeClass('active').siblings(element).removeClass('active');
			} else {
				$('body').addClass('menu-open');
				$(this).addClass('active').siblings(element).addClass('active');
			}
		});
		$('.close-menu').on('click', function () {
			$('body').removeClass('menu-open');
			$('.menu-mb').removeClass('active');
			$('.menu-mb-content').removeClass('active');
		});

		/*--------------------------------------------------------
			SLICK
		--------------------------------------------------------*/
		if ($('.main-banner').length) {
			$('.main-banner').addClass('active');
			$('.main-banner').slick({
				dots: true,
				speed: 400,
				autoplay: true,
				autoplaySpeed: 5000,
			});
		}

		$('.product-slider').slick({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 4,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
			}, {
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
			}, {
					breakpoint: 521,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
			}
		]
		});

		/*--------------------------------------------------------
			INSTAFEED
		--------------------------------------------------------*/
		var feed = new Instafeed({
			get: 'user',
			limit: '12',
			sortBy: 'most-recent',
			tagName: 'instagram_list',
			userId: 2039819407,
			accessToken: '2039819407.62f1cc9.ff48d1d3fd8e472c91a2494d34fd2b51',
			resolution: 'low_resolution',
			template: '<a href="{{link}}" target="_blank" title="{{caption}}" class="photo-i"><div class="inner" style="background-image:url({{image}});"><img src="{{image}}" alt="{{caption}}" /><div class="box-like"><div class="center"><span class="likes">{{likes}}</span><span class="comments">{{comments}}</span></div></div></div></a>',
			after: setSlick,
		});

		function setSlick() {
			$('#instafeed').slick({
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 6,
				slidesToScroll: 6,
				responsive: [
					{
						breakpoint: 1025,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 5
						}
					}, {
						breakpoint: 768,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					}, {
						breakpoint: 601,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					}, {
						breakpoint: 521,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		}

		feed.run();

		/*--------------------------------------------------------
			UI
		--------------------------------------------------------*/
		$('.select').selectmenu();
		$('#orderSearch').selectmenu({
			change: function (event, data) {
				filtrarBusca(data.item.value);
			}
		});

		/*--------------------------------------------------------
			PRODUCT GALLERY
		--------------------------------------------------------*/
		if ($('#large-img').length) {
			$('#box_thumb').slick({
				vertical: true,
				infinite: false,
				speed: 500,
				slidesToShow: 5,
				slidesToScroll: 5,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							vertical: false,
							slidesToShow: 5,
							slidesToScroll: 5
						}
				},
					{
						breakpoint: 521,
						settings: {
							vertical: false,
							slidesToShow: 4,
							slidesToScroll: 4
						}
				}
			]
			});

			function iniZoom() {
				$('.box-zoom img').elevateZoom({
					gallery: 'box_thumb',
					cursor: 'pointer',
					galleryActiveClass: 'active',
					imageCrossfade: true,
					zoomType: 'inner',
					responsive: true,
					zoomWindowFadeIn: 500,
					zoomWindowFadeOut: 750,
				});
			}

			function mbZoom() {
				$('#box_thumb a').each(function () {
					$(this).click(function () {
						var getNewImg = $(this).data('zoom-image');
						$('#image_box').find('.box-zoom').empty();
						$('#image_box').find('.box-zoom').append('<img src="' + getNewImg + '" />');
					});
				});
			}

			if (wWin > 640) {
				iniZoom();
			} else {
				mbZoom();
			}

			$(window).resize(function () {
				$('#box_thumb a.active').trigger('click');
			});

			$('#box_thumb a:not(.thumb-video)').on('click', function (e) {
				$('.box-video').fadeOut();
				$('.box-zoom').fadeIn();
				$('.zoomContainer').css('display', 'block');
			});

			$('.thumb-video').on('click', function (e) {
				e.preventDefault();
				$('.box-zoom').fadeOut();
				$('.box-video').fadeIn();
				$('.zoomContainer').css('display', 'none');
			});

		}

		/*-------------------------------------------
			QUANTITY BUTTON
		-------------------------------------------*/
		$('.qty').keyup(function () {
			var valor = $(this).val().replace(/[^0-9]+/g, '');
			if (valor == 0) {
				$(this).val(1);
			} else {
				$(this).val(valor);
			}
		});

		$('.i-increase').click(function (e) {
			e.preventDefault();
			fieldName = $(this).attr('field');
			var currentVal = parseInt($('input[name=' + fieldName + ']').val());
			if (!isNaN(currentVal)) {
				$('input[name=' + fieldName + ']').val(currentVal + 1);
			} else {
				$('input[name=' + fieldName + ']').val(1);
			}
		});

		$('.i-disincrease').click(function (e) {
			e.preventDefault();
			fieldName = $(this).attr('field');
			var currentVal = parseInt($('input[name=' + fieldName + ']').val());
			if (!isNaN(currentVal) && currentVal > 1) {
				$('input[name=' + fieldName + ']').val(currentVal - 1);
			} else {
				$('input[name=' + fieldName + ']').val(1);
			}
		});

		/*--------------------------------------------------------
			VALIDATE INPUT
		--------------------------------------------------------*/
		$('.modal form#cadForm button').on('click', function (e) {
			var form = $(this).closest('form'),
				iptName = form.find('input[name="cadNome"]'),
				regName = /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{1,19}\b/gi; // Regex para duas strings, separadas com espaço e com no mínimo 2 caracteres. Aceita acentuação e rejeita números.

			if (!iptName.val()) {
				if (iptName.siblings('.lbl-form-error').length) {
					iptName.siblings('.lbl-form-error').remove();
				}
			} else {
				if (!(regName.test(iptName.val()))) {
					form.removeClass('ready');
					if (!iptName.siblings('.lbl-form-error').length) {
						iptName.after('<span class="lbl-form-error">Preencha o campo com seu nome completo</span>');
					}
				} else {
					form.addClass('ready');
					if (iptName.siblings('.lbl-form-error').length) {
						iptName.siblings('.lbl-form-error').remove();
					}
				}
			}
		});

		$('.modal form#cadForm').on('submit', function (e) {
			if (!$(this).hasClass('ready')) {
				return false;
			}
		});

		/*--------------------------------------------------------
			DEFAULT INVENTO
		--------------------------------------------------------*/
		$(document).ready(function () {
			$('.ip-phone').mask('(00) 0000-00000');
			$('.ip-date').mask('00/00/0000');
			$('.ip-cep').mask('00000-000');
		});

	});
})(jQuery);