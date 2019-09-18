$(document).ready(function(){
	var $_MAIN_SLIDER = $('.main-slider .container-slider'),
		$_RELATEDS_SLIDER = $('.relateds .container-slider'),
		SETTINGS_MAIN_SLIDER = {
			arrows: true,
			dots: true,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 992,
					settings: "unslick"
				},
			]
		},
		SETTINGS_RELATEDS_SLIDER = {
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
		},
		$_MAIN_CONTENT_DETAIL = $('#section_detail')

	if(window.location.hash) {
		$_MAIN_CONTENT_DETAIL.load("/details/" + window.location.hash.substr(1) + ".html");
		
		$(".description-search").addClass('hide-section')
		$("#results-search").addClass('hide-section')
		$("#section_detail").removeClass('hide-section').addClass('show-section')
		$('#home').addClass('hide-section')
		$('.relateds').removeClass('hide-section')
		$('.phone-app').removeClass('hide-section')
		$("html, body").animate({ scrollTop: 0 }, 1000);
	}

	$(window).on('load', function () {
		$('.container-links')
			.on('click', '.read-more', function(e){
				e.preventDefault()
				var $el = $(e.currentTarget),
					hash_link = $el.attr('href')
					hash_no_html =  hash_link.split('.html')[0]

				window.location.hash = hash_no_html

				$(".description-search").addClass('hide-section')
				$("#results-search").addClass('hide-section')
				$("#section_detail").removeClass('hide-section').addClass('show-section')
				$('#home').addClass('hide-section')
				$('.relateds').removeClass('hide-section')
				$('.phone-app').removeClass('hide-section')
				$("html, body").animate({ scrollTop: 0 }, 1000);

				// window.location.href = "/#" + name_html;
				$(window).bind('hashchange', function() {
					// newHash = window.location.hash.substr(1);
					$_MAIN_CONTENT_DETAIL.load("/details/" + hash_link);
				})
			})
	})

	$_MAIN_SLIDER.slick(SETTINGS_MAIN_SLIDER)
	$_RELATEDS_SLIDER.slick(SETTINGS_RELATEDS_SLIDER)

	$(window).on('resize', function(){
		if($(window).width() < 992){
			if($_MAIN_SLIDER.hasClass('slick-initialized')){
				$_MAIN_SLIDER.slick('unslick')
			}
			return
		}

		if(!$_MAIN_SLIDER.hasClass('slick-initialized')){
			return $_MAIN_SLIDER.slick(SETTINGS_MAIN_SLIDER)
		}
	})

	$(".input-search").focus(function(){
		$('.block-search').addClass('block-focused')
		$(".container-search").addClass('move-search')
		$('#results-search').removeClass('hide-section').addClass('show-section')
		$('#section_detail').removeClass('show-section').addClass('hide-section')
		$('.relateds').addClass('hide-section')
		$('.phone-app').addClass('hide-section')
		$("#home").addClass('hide-section')
	})

	$(".input-search").focusout(function(){
		$('.block-search').removeClass('block-focused')
		$(".container-search").removeClass('move-search')
		$("#home").removeClass('hide-section')
	})

	//********************************//
	//********************************//
	//      SEARCH FUNCTIONALITY      //
	//********************************//
	//********************************//

	var products = new Array(
		// ['Brand_Institucional', "Brand Institucional", "#Brand_Institucional"],
		// ['Brand_Competencia', "Brand Competencia", "#Brand_Competencia"],
		// ['Affinity_Mi Itaú Efectivo', "Affinity Mi Itaú Efectivo", "#Affinity_Mi Itaú Efectivo"],
		// ['Affinity_Mi Itaú Viajes', "Affinity Mi Itaú Viajes", "#Affinity_Mi Itaú Viajes"],
		['Category_Empresas', "Crédito Pymes", "credito-pymes.html"],
		['Categoty_Giros Internacionales', "Giros Internacionales", "giros-internacionales.html"],
		['Category_Credito', "Crédito Itaú", "credito-itau.html"],
		['Affinity_Días Itaú', "Días Itaú", "dias-itau.html"],
		['Affinity_Cine Colombia', "2x1 Cine Colombia", "2x1-cine-colombia.html"],
		['Affinity_Canales Digitales', "Canales Digitales", "canales-digitales.html"],
		['Affinity_App Tarjetas', "App Tarjetas", "app-itau-tarjetas-colombia.html"],
		['Affinity_Usa y no pagues', "Usa y no pagues", "usa-y-no-pagues.html"]
	);

	var data_search = new Array();
	//Get Data CSV
	$.ajax({
		type: "GET",
		url: "/data/data_search.csv",
		dataType: "text",
		success: function(response){
			data_search = $.csv.toArrays(response);
		}
	});

	function search_product(search_text){
		var products_array = new Array();
		data_search.forEach(function(element) {
			if (element[1].indexOf(search_text) != -1){
				if (products_array.indexOf(element[0]) == -1) {
					products_array.push(element[0]);
				} 
			}
		});
		if (products_array.length > 0){
			var search_result_html = "<ul>";
			var number_elements = 0;
			products_array.forEach(function(element) {
				products.forEach(function(element_product) {
					if (element == element_product[0]){
						var html_li = '<li><a class="read-more" href="' + element_product[2] + '">' + element_product[1] + '</a></li>';
						search_result_html += html_li;
						number_elements ++;
					};
				});
			});
			search_result_html += "</ul>";
			if (number_elements > 0){
				$("#results-search").html(search_result_html);
			}else{
				search_result_html = '<ul><li>No se encontraron resultados</li></ul>'
				$("#results-search").html(search_result_html);
			}
		}else{
			search_result_html = '<ul><li>No se encontraron resultados</li></ul>'
				$("#results-search").html(search_result_html);
		}
	}

	$('form input').keydown(function(e){
		if (e.keyCode == 13){
			e.preventDefault()
			return false
		}
	})

	$('form input.input-submit').click(function(e){
		e.preventDefault()
		$(".input-search").focus()
		return false
	})

	$(".input-search").keyup(function() {
		var search = $(".input-search").val();
		search = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
		if (search.length >= 3){
			search_product(search.toLowerCase());
		}else{
			$("#results-search").html("");
		}
	});

	$("#results-search").on('click', '.read-more', function(e){
		e.preventDefault()
		var $el = $(e.currentTarget)
		name_category = $el.text()

		console.log(name_category)

		$('form .input-search').val(name_category)
		$('#results-search').addClass('hide-section')
	})
})