$( document ).ready(function() {
	new FastClick(document.body);
	var selected;
	$("#bFecha").click(function () {
		tabs("fecha");
		$("#bFecha").toggleClass("active");
	});
	$("#bTabla").click(function () {
		tabs("tabla");
		$("#bTabla").toggleClass("active");
	});
	$("#bJug").click(function () {
		tabs("jug");	
		$("#bjug").toggleClass("active");
	});
	$("#rtabla").click(function(){
		$('#tablaweb .topcoat-button--large--quiet').load(document.URL + ' #tablaweb');
	});
	$("#rfecha").click(function(){
		$('#fechaweb').load(document.URL + ' #fechaweb');
	});

	var iframe = $('#itable');
	iframe.load(function(){
		iframe.contents().find(".bottom-line, #tab-tabla-1692, #tab-fairplay, #tab-vallamenosvencida, #tabla-posiciones-1692 .col3, .col4, .col5, .col6, .col7, .col9, .col-fp, .instructions").hide();
		iframe.contents().find('.titles').css("background-color", "#000069");
		iframe.contents().find('.titles').css("width", "100%");
		iframe.contents().find('.col1').css("width", "40%");		
		iframe.contents().find('.col2, .col8, .col10').css("width", "20%");

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