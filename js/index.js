var refrdata = false;

$( document ).ready(function() {
	var date = new Date();
	console.log(date.getDay())
	new FastClick(document.body);
	iframeLoad($('#itable'));
	$("#bFecha").toggleClass("tabsel");
	jugLoad();
	setInterval(function() {
			if(!paused){
				jugLoad();
			}
		}, 10000);
	var delJugadores = [];
	var network = true;
	var paused = false;
	$("#save").hide();
	$("#cancel").hide();

	if(network) {
		$("#itable").attr('src', 'http://www.datafutbol.net/comunidad/campeonato/tablas/545#tabla-posiciones-1692');
		$("#iwfecha").attr('src','http://www.360sports.com.ar/images/horarios_domingos.jpg');
	} else {
		alert("no hay internesss, no hay data")
		$("#itable").hide();
		$("#iwfecha").hide();
		$("#tablaweb").append("<span class='wtext'>Error. Estas conectado a internet boludo?</span>");
		$("#fechaweb").append("<span class='wtext'>Error. Estas conectado a internet boludo?</span>");
	}

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
		if(network) {
			animate($(this), "rotate");
			$("#itable").attr('src', 'http://www.datafutbol.net/comunidad/campeonato/tablas/545#tabla-posiciones-1692');
			iframeLoad($('#itable'));
			$('#tablaweb').effect("fade");
			$("#itable").show();
			$("#tablaweb span").remove();
			setTimeout(function() {$( "#tablaweb" ).fadeIn();}, 350 );
		} else {
			alert("no hay interne amigo");
		}	
	});
	$("#rfecha").click(function(){
		if(network) {
			$('#fechaweb').effect("fade");
			animate($(this), "rotate");
			$('#iwfecha').attr("src","http://360sports.com.ar/images/horarios_domingos.jpg");
			$("#iwfecha").show();
			$("#fechaweb span").remove();
			setTimeout(function() {$( "#fechaweb" ).fadeIn();}, 350 );
		} else {
			alert("no hay interne amigo");
		}
	});
	$("#rjug").click(function(){
		if(network) {	
			animate($(this), "rotate");
			$('#ljug span').effect("fade");
			setTimeout(function() { 
				$('#ljug span').remove();
				$('#ljug br').remove();
			}, 150);
			setTimeout(jugLoad, 350);
		} else {
			alert("no hay interne amigo");
		}
	});
	$("#iwfecha").click(function() { $('#imgModal').modal('toggle'); })
	$("#addbtn").click(function(){
		if(!isNullOrWhiteSpace($("#nInv").val()) && (($("#nInv").val().length<30) && ($("#nInv").val().length>2))) {
			dbrequest("http://itshare.ddns.net:9290/user/"+$("#nInv").val(), "POST");
			$("#rjug").click();
			$("#nInv").val("");
		} else {
			animate($("#nInv"), "invalidtxt");
		}
	});

	$('#nInv').keydown(function(event) {
       if (event.keyCode == 13) {
           $("#addbtn").click();
        }
   });

	$("#edit").click(function() {
		paused = true;
		$('#ljug .check').not('.glyphicon-remove').removeClass('glyphicon-ok');
		$('#ljug .check').not('.glyphicon-remove').addClass('glyphicon-remove');
		$('#ljug .glyphicon-remove').addClass('bounce');
		$('#ljug .glyphicon-remove').addClass('del');
		$('#ljug .glyphicon-remove').removeClass('check');
		$("#save").show();
		$("#cancel").show();
		$("#edit").attr("disabled", "disabled");
		$("#rjug").hide();
	});
	$("#ljug").on('click', '.del', function () {
		$(this).closest('.name').toggleClass("rmark");
		var valid = true;
		for(var i in delJugadores) {
			if ($(this).closest('.name').text()===delJugadores[i]) {
				valid = false;
				delJugadores.splice(i,1);
			}
		}
		if (valid) {
			delJugadores[delJugadores.length] = $(this).closest('.name').text();
		}
	});
	$("#ljug").on('click', '.check', function () {
		if($(this).hasClass("glyphicon-remove")) {
			dbrequest("http://itshare.ddns.net:9290/check/"+$(this).closest('.name').text()+"/true","POST")
		} else if ($(this).hasClass("glyphicon-ok")){
			dbrequest("http://itshare.ddns.net:9290/check/"+$(this).closest('.name').text()+"/false","POST")
		}
		jugLoad();
	});
	$("#save").click(function(){
		for(var i in delJugadores) {
			dbrequest("http://itshare.ddns.net:9290/user/"+delJugadores[i],"DELETE");
		}
		$(".rmark").remove();
		delJugadores = [];
		$("#save").hide();
		$("#cancel").hide();
		setTimeout(function(){
			jugLoad();
			paused = false;}
		, 1500);
		$("#edit").removeAttr("disabled");   
		$("#rjug").show();
	})
	$("#cancel").click(function() {
		jugLoad();
		delJugadores = [];
		paused = false;
		$("#save").hide();
		$("#cancel").hide();
		$("#edit").removeAttr("disabled");
		$("#rjug").show();
	});
	$("#dall").click(function() {
		dbrequest("http://itshare.ddns.net:9290/delete/all", "DELETE");
	})
	$("#rall").click(function() {
		dbrequest("http://itshare.ddns.net:9290/restore/all", "POST");
	})

	$("#preload").hide();

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
	//$("#loader").show();
	animate($('#rjug'), "rotate");
	$("#edit").attr("disabled", "disabled");
	var request = $.get("http://itshare.ddns.net:9290/getjugadores");
	request.success(function(data) {
		cont=0;
		network = true;
		$("#ljug").html("");
  		for (i=0;i<data.length;i++) {
 			if (!data[i].Checked) {
 				$("#ljug").append("<span class='wtext name'>"+data[i].Nombre + "<span class='wtext glyphicon glyphicon-remove check'></span><br></span>");
			} else {
				$("#ljug").append("<span class='wtext name'>"+data[i].Nombre + "<span class='wtext glyphicon glyphicon-ok check'></span><br></span>");
				cont++;
			}
		}
		$("#cont").text(":"+cont);
		//$("#loader").hide();
	});
	request.error(function(xhr, status, error) {
		network = false;
		 $("#ljug").html("");
	     $("#ljug").append("<span class='wtext'>Error. Estas conectado a internet boludo?</span>  "+ error);
		 $("#loader").hide();
	});	
	$("#edit").removeAttr("disabled");  
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
	.done(function() {
    	jugLoad();
    });
}