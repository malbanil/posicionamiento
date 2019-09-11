$(document).ready(function() {
	// $(window).load(function () {
	// 	$('.container-slider')
	// 		.on('click', '.read-more', function(e){
	// 			e.preventDefault()
	// 			var $el = $(e.currentTarget),
	// 				hash_button = $el.attr('href').substring(1)

	// 			window.location.href = "/#" + hash_button;

	// 			$('.block-section').each(function() {
	// 				if($(this).attr('id') == hash_button && $(this).hasClass('hide-section')) {
	// 					$('.block-section').addClass('hide-section')
	// 					$(this).removeClass('hide-section').addClass('active-section')
	// 				}
	// 			})
	// 		})
	// });

	if($(window).width() > 991){
		$('.main-slider .container-slider').slick({
			arrows: true,
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 3
		})
	}

	$('.relateds .container-slider').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 3,
		slidesToScroll: 3,
		infinite: true,
		responsive: [
			{
				breakpoint: 992,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
			},
		]
	})

	$(".input-search").focus(function(){
		$('.block-search').addClass('block-focused')
		$(".container-search").addClass('move-search')
		$("#home").removeClass('active-section')
		$("#home").addClass('hide-section')
	})

	$(".input-search").focusout(function(){
		$('.block-search').removeClass('block-focused')
		$(".container-search").removeClass('move-search')
		$("#home").addClass('active-section')
		$("#home").removeClass('hide-section')
	})
})