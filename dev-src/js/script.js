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

  //Search Functionality
  var products = new Array(
    ['Brand_Institucional', "Brand Institucional", "#Brand_Institucional"],
    ['Brand_Competencia', "Brand Competencia", "#Brand_Competencia"],
    ['Category_Credito', "Category Credito", "#Category_Credito"],
    ['Categoty_Giros Internacionales', "Categoty Giros Internacionales", "#Categoty_Giros Internacionales"],
    ['Affinity_Días Itaú', "Affinity Días Itaú", "#Affinity_Días Itaú"],
    ['Affinity_Mi Itaú Efectivo', "Affinity Mi Itaú Efectivo", "#Affinity_Mi Itaú Efectivo"],
    ['Affinity_Cine Colombia', "Affinity Cine Colombia", "#Affinity_Cine Colombia"],
    ['Affinity_Mi Itaú Viajes', "Affinity Mi Itaú Viajes", "#Affinity_Mi Itaú Viajes"],
    ['Affinity_Canales Digitales', "Affinity Canales Digitales", "#Affinity_Canales Digitales"],
    ['Affinity_App Tarjetas', "Affinity App Tarjetas", "#Affinity_App Tarjetas"],
    ['Affinity_Usa y no pagues', "Affinity Usa y no pagues", "#Affinity_Usa y no pagues"],
  ); 

  var data_search = new Array();
  //Get Data CSV
  $.ajax({
    type: "GET",  
    url: "/data/data_search.csv",
    dataType: "text",       
    success: function(response)  
    {
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
      var products_data = new Array();
      var search_result_html = "<ul>";
      products_array.forEach(function(element) {
        products.forEach(function(element_product) {
          if (element == element_product[0]){
            var html_li = '<li><a href="' + element_product[2] + '">' + element_product[1] + '</a></li>';
            search_result_html += html_li; 
          };
        });
      });
      search_result_html += "</ul>";
      $("#results-search").html(search_result_html);
    }else{
      $("#results-search").html("");
    }
  }

  $(".input-search").keyup(function() {
    var search = $(".input-search").val();
    search = search.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    if (search.length >= 3){
      search_product(search.toLowerCase());
    }else{
      $("#results-search").html("");
    }
  });

})