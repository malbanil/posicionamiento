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
		$_MAIN_CONTENT_DETAIL = $('#section_detail'),
		VERSION_DEV = 'OCT-18-2019'

	$('body').addClass(VERSION_DEV)

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

	$("#section_detail").removeClass('hide-section').addClass('show-section')
	$(".section_detail_search .description-search").addClass('hide-section').removeClass('show-section')

	$('.container-links')
		.on('click', '.read-more', function(e){
			var $el = $(e.currentTarget),
				$val_search = $el.text()

			localStorage.setItem('val_search', $val_search);
		})

	if (localStorage.getItem("val_search") !== null) {
		if(localStorage.getItem('val_search').length > 0) {
			if(localStorage.getItem('val_search') == 'Ver más') {
				$('.input-search').val('')
			}
			else {
				$('.input-search').val(localStorage.getItem('val_search'))
			}
		}
	}
	
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
		['Category_Empresas', "Crédito Pymes", "/credito-pymes.html"],
		['Categoty_Giros Internacionales', "Giros Internacionales", "/giros-internacionales.html"],
		['Category_Credito', "Crédito Itaú", "/credito-itau.html"],
		['Affinity_Días Itaú', "Días Itaú", "/dias-itau.html"],
		['Affinity_Cine Colombia', "2x1 Cine Colombia", "/2x1-cine-colombia.html"],
		['Affinity_Canales Digitales', "Canales Digitales", "/canales-digitales.html"],
		['Affinity_App Tarjetas', "App Tarjetas", "/app-itau-tarjetas-colombia.html"],
		['Affinity_Usa y no pagues', "Usa y no pagues", "/usa-y-no-pagues.html"]
	);

	var data_search = new Array();
	//Get Data CSV
	//Change CSV to JSON
	/*$.ajax({
		type: "GET",
		url: "data/data_search.csv",
		dataType: "text",
		success: function(response){
			data_search = $.csv.toArrays(response);
		}
	});*/

	$.getJSON("data/data_search.json", function(response) {
		data_search = [];
		for(var i in response){
			element = response[i];
			data_search.push([element.group, element.keyword]);
		}
	});

	function search_product(search_text){
		var products_array = new Array();
		data_search.forEach(function(element) {
			if (element[1].search(search_text) != -1){
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

	accentsTidy = function(s){
		var r=s.toLowerCase();
		//r = r.replace(new RegExp("\\s", 'g'),"");
		r = r.replace(new RegExp("[àáâãäå]", 'g'),"a");
		r = r.replace(new RegExp("æ", 'g'),"ae");
		r = r.replace(new RegExp("ç", 'g'),"c");
		r = r.replace(new RegExp("[èéêë]", 'g'),"e");
		r = r.replace(new RegExp("[ìíîï]", 'g'),"i");
		// r = r.replace(new RegExp("ñ", 'g'),"n");
		r = r.replace(new RegExp("[òóôõö]", 'g'),"o");
		r = r.replace(new RegExp("œ", 'g'),"oe");
		r = r.replace(new RegExp("[ùúûü]", 'g'),"u");
		r = r.replace(new RegExp("[ýÿ]", 'g'),"y");
		//r = r.replace(new RegExp("\\W", 'g'),"");
		return r;
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
		search = accentsTidy(search)
		if (search.length >= 3){
			search_product(search.toLowerCase());
			$("#results-search").removeClass('hide-section').addClass('show-section')
		}else{
			$("#results-search").addClass('hide-section').removeClass('show-section')
		}
	});

	$(".input-search").focus(function(){
		$('.block-search').addClass('block-focused')
		$(".container-search").addClass('move-search')
		$("#home").addClass('hide-section').removeClass('show-section')
	})

	if($('#section_detail').hasClass('show-section')){
		$(".input-search").focus(function(){
			$(".description-search").removeClass('hide-section').addClass('show-section')
			$('#results-search').removeClass('hide-section').addClass('show-section')
			$("#section_detail").addClass('hide-section').removeClass('show-section')
			$(".phone-app-home").addClass('hide-section').removeClass('show-section')
		})
	}

	$(".input-search").focusout(function(){
		$('.block-search').removeClass('block-focused')
		$(".container-search").removeClass('move-search')
		$("#results-search").addClass('hide-section').removeClass('show-section')
		$("#section_detail").removeClass('hide-section').addClass('show-section')
		$("#home").removeClass('hide-section').addClass('show-section')
		$(".phone-app-home").removeClass('hide-section').addClass('show-section')
	})
})