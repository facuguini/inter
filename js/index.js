$( document ).ready(function() {
	new FastClick(document.body);
	$("#bFecha").toggleClass("tabsel");
	$("#bFecha").click(function () {
		$(".tab").removeClass("tabsel");
		$(this).toggleClass("tabsel");
		tabs("fecha");
	});
	$("#bTabla").click(function () {
		$(".tab").removeClass("tabsel");
		$(this).toggleClass("tabsel");
		tabs("tabla");
	});
	$("#bJug").click(function () {
		$(".tab").removeClass("tabsel");
		$(this).toggleClass("tabsel");
		tabs("jug");	
	});
	$("#rtabla").click(function(){
		animate($(this));
		iframe.load(function(){
			iframe.contents().find(".bottom-line, #tab-tabla-1692, #tab-fairplay, #tab-vallamenosvencida, #tabla-posiciones-1692 .col3, .col4, .col5, .col6, .col7, .col9, .col-fp, .instructions").hide();
			iframe.contents().find('.titles').css("background-color", "#000069");
			iframe.contents().find('.titles').css("width", "100%");
			iframe.contents().find('.col1').css("width", "40%");		
			iframe.contents().find('.col2, .col8, .col10').css("width", "20%");
		})
		$('#tablaweb').effect("fade");
		setTimeout(function() {$( "#tablaweb" ).fadeIn();}, 350 );
	});
	$("#rfecha").click(function(){
		animate($(this));
		$('#fechaweb').load(document.URL + ' #fechaweb');
		$('#fechaweb').effect("fade");
		setTimeout(function() {$( "#fechaweb" ).fadeIn();}, 350 );
	});

	var iframe = $('#itable');
	iframe.load(function(){
		iframe.contents().find(".bottom-line, #tab-tabla-1692, #tab-fairplay, #tab-vallamenosvencida, #tabla-posiciones-1692 .col3, .col4, .col5, .col6, .col7, .col9, .col-fp, .instructions").hide();
		iframe.contents().find('.titles').css("background-color", "#000069");
		iframe.contents().find('.titles').css("width", "100%");
		iframe.contents().find('.col1').css("width", "40%");		
		iframe.contents().find('.col2, .col8, .col10').css("width", "20%");
	})

	$("#iwfecha").click(function() {
		$('#imgModal').modal('toggle');
	})
});



function tabs(id) {
	switch(id) {
		case "fecha":
			$("#fecha").show()
			$("#tabla").hide()
			$("#jug").hide()
			break;
		case "tabla":
			$("#tabla").show()
			$("#fecha").hide()
			$("#jug").hide()
			break;
		case "jug":
			$("#jug").show()
			$("#tabla").hide();
			$("#fecha").hide()
			break;
	}
}

var animate = function(animar) {
	    animateClass = "glyphicon-refresh-animate";
	    animar.addClass( animateClass );
  	     window.setTimeout( function() {
     	        animar.removeClass( animateClass );
             }, 1000 );  
	}