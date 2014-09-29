$( document ).ready(function() {
	new FastClick(document.body);
	var listLength = 7;
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
		animate($(this), "rotate");
		$('#iwfecha').attr("src","http://www.360sports.com.ar/images/horarios_domingos.jpg");
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

	$("#addbtn").click(function(){
		listLength++;
		if(!isNullOrWhiteSpace($("#nInv").val()) && (($("#nInv").val().length<30) && ($("#nInv").val().length>2))) {
			$("#ljug").append("<div id='inv'><span class='wtext'>"+$("#nInv").val()+"</span><span id='rem' class='wtext glyphicon glyphicon-remove'></span><br></div>");
			$("#nInv").val("");
		} else {
			$("#nInv").addClass("invalidtxt");
			setTimeout(function() {$("#nInv").removeClass("invalidtxt");}, 300 );
			setTimeout(function() {$("#nInv").addClass("invalidtxt");}, 600 );
			setTimeout(function() {$("#nInv").removeClass("invalidtxt");}, 900 );
			setTimeout(function() {$("#nInv").addClass("invalidtxt");}, 1200 );
			setTimeout(function() {$("#nInv").removeClass("invalidtxt");}, 1500 );
		}
	})
	for(i=1;i<listLength+1;i++) {
		$("#rem"+i).click(function() {
			if($(this).hasClass("glyphicon-remove")) {
				$(this).addClass("glyphicon-ok");
				$(this).removeClass("glyphicon-remove");
			} else {
				$(this).addClass("glyphicon-remove");
				$(this).removeClass("glyphicon-ok");
			}
		})
	}
	$("#inv").on( 'click', '.glyphicon-remove', function () {
		$(this).closest("div").remove();
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

var animate = function(animar, animation) {
    animar.addClass( animation );
    window.setTimeout( function() {animar.removeClass( animation );}, 1000 );  
}

function isNullOrWhiteSpace( input ) {
    if (input == null) return true;
    return input.replace(/\s/g, '').length < 1;
}