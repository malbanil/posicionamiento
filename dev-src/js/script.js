var hash = window.location.hash.substring(1)
$('.block-section').each(function() {
	if($(this).attr('id') == hash && $(this).hasClass('hide-section')) {
		$('.block-section').addClass('hide-section')
		$(this).removeClass('hide-section').addClass('active-section')
	}
})

$(document).ready(function() {
	

	$(window).load(function () {
		$('.container-slider')
			.on('click', '.read-more', function(e){
				e.preventDefault()
				var $el = $(e.currentTarget)
				var hash_button = $el.attr('href').substring(1)

				window.location.href = "/#" + hash_button;

				$('.block-section').each(function() {
					if($(this).attr('id') == hash_button && $(this).hasClass('hide-section')) {
						$('.block-section').addClass('hide-section')
						$(this).removeClass('hide-section').addClass('active-section')
					}
				})
			})

		



		// if (hash) {
		// 	// $('.item').filter(function() {
		// 	// 	return $(this).children('.item-anchor').data('filter') !== hash;
		// 	// }).hide();

		// 	// $('a.filter-button[href="#'+hash+'"]').addClass('active');

		// 	if($('.block-section').attr('id') == hash) {
		// 		console.log('ok')
		// 	}
		// }
});

	if($(window).width() > 991){
		$('.main-slider .container-slider').slick({
			arrows: true,
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 3
		})
	}
})