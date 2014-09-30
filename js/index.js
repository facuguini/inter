$( document ).ready(function() {
	new FastClick(document.body);
	jugLoad();
	iframeLoad($('#itable'));
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
		animate($(this), "rotate");
		iframeLoad($('#itable'));
		$('#tablaweb').effect("fade");
		setTimeout(function() {$( "#tablaweb" ).fadeIn();}, 350 );
	});
	$("#rfecha").click(function(){
		animate($(this), "rotate");
		$('#iwfecha').attr("src","http://360sports.com.ar/images/horarios_domingos.jpg");
		$('#fechaweb').effect("fade");
		setTimeout(function() {$( "#fechaweb" ).fadeIn();}, 350 );
	});
	$("#rjug").click(function(){
		animate($(this), "rotate");
		$('#ljug').effect("fade");
		$('#ljug span').remove();
		$('#ljug br').remove();
		jugLoad();
		setTimeout(function() {$( "#ljug" ).fadeIn();}, 0 );
	});
	$("#iwfecha").click(function() { $('#imgModal').modal('toggle'); })
	$("#addbtn").click(function(){
		if(!isNullOrWhiteSpace($("#nInv").val()) && (($("#nInv").val().length<30) && ($("#nInv").val().length>2))) {
			dbrequest("http://stingo.com.ar:9290/user/"+$("#nInv").val(), "GET");
			$("#rjug").click();
			$("#nInv").val("");
		} else {
			animate($("#nInv"), "invalidtxt");
		}
	});
	$("#ljug").on('click', '.del', function () {
		dbrequest("http://stingo.com.ar:9290/user/"+$(this).closest('.name').text(),"DELETE");
		$(this).closest('.name').remove();
	});
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
			$("#tabla").hide()
			$("#fecha").hide()
			break;
	}
}


var animate = function(animar, animation) {
    animar.addClass( animation );
    window.setTimeout(function() {
    	animar.removeClass( animation );
    	}
    , 1000 );  
}

function isNullOrWhiteSpace( input ) {
    if (input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}

function jugLoad() {
	$.get( "http://stingo.com.ar:9290/getJugadores", function( data ) {
 		for (i=0;i<data.length;i++) { 
 			$("#ljug").append("<span class='wtext name'>"+data[i].Nombre+"<span class='wtext glyphicon glyphicon-remove del'></span><br></span>");
		}
	});
}

function iframeLoad(iframe) {
	iframe.load(function(){
		iframe.contents().find(".bottom-line, #tab-tabla-1692, #tab-fairplay, #tab-vallamenosvencida, #tabla-posiciones-1692 .col3, .col4, .col5, .col6, .col7, .col9, .col-fp, .instructions").hide();
		iframe.contents().find('.titles').css("background-color", "#000069");
		iframe.contents().find('.titles').css("width", "100%");
		iframe.contents().find('.col1').css("width", "40%");		
		iframe.contents().find('.col2, .col8, .col10').css("width", "20%");
		iframe.contents().find(".col").closest("a").remove();
	})
}

function dbrequest (_url, _type) {
	jQuery.ajax( {
		url: _url, 
		type: _type
	})
}