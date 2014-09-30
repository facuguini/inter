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
			iframe.contents().find(".col").children.remove();
		})
		$('#tablaweb').effect("fade");
		setTimeout(function() {$( "#tablaweb" ).fadeIn();}, 350 );
	});
	$("#rfecha").click(function(){
		animate($(this), "rotate");
		//download("http://360sports.com.ar/images/horarios_domingos.jpg", "file:///storage/sdcard0/intergarchapp/images/horarios_domingos.jpg");
		//$('#iwfecha').attr("src","file:///storage/sdcard0/intergarchapp/images/horarios_domingos.jpg");
		$('#iwfecha').attr("src","http://360sports.com.ar/images/horarios_domingos.jpg");
		$('#fechaweb').effect("fade");
		setTimeout(function() {$( "#fechaweb" ).fadeIn();}, 350 );
	});
	$("#rjug").click(function(){
		animate($(this), "rotate");
		$('#ljug').effect("fade");
		$('#ljug').load();
		setTimeout(function() {$( "#ljug" ).fadeIn();}, 350 );
	});

	var iframe = $('#itable');
	iframe.load(function(){
		iframe.contents().find(".bottom-line, #tab-tabla-1692, #tab-fairplay, #tab-vallamenosvencida, #tabla-posiciones-1692 .col3, .col4, .col5, .col6, .col7, .col9, .col-fp, .instructions").hide();
		iframe.contents().find('.titles').css("background-color", "#000069");
		iframe.contents().find('.titles').css("width", "100%");
		iframe.contents().find('.col1').css("width", "40%");		
		iframe.contents().find('.col2, .col8, .col10').css("width", "20%");
		iframe.contents().find(".col").closest("a").remove();
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





	alert(http.get('http://stingo.com.ar:9290/getjugadores'))
	alert($.get('http://stingo.com.ar:9290/getjugadores'))
	alert(httpGet('http://stingo.com.ar:9290/getjugadores'))
	aClient = new HttpClient();
	aClient.get('http://stingo.com.ar:9290/getjugadores', function(answer) {
    	alert(answer);
	});
	new Ajax.Request( 'http://stingo.com.ar:9290/getjugadores', {
	  method:  'get',
	  parameters:  { 'param1': 'value1'},
	  onSuccess:  function(response){
	    alert(response.responseText);
	  },
	  onFailure:  function(){
	    alert('ERROR');
	  }
	});







	var jugadores = $.get('stingo.com.ar:9290/getjugadores').success(
		function(data) {
			for(var i in data) {
				$("#ljug").append("<span class='wtext'>"+data[i].Nombre+"</span><span id='rem' class='wtext glyphicon glyphicon-remove'></span><br>");
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
	//document.addEventListener("deviceready", download("http://360sports.com.ar/images/horarios_domingos.jpg", "file:///storage/sdcard0/intergarchapp/images/horarios_domingos.jpg"), false);
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

/*function download(url, filePath) {
	alert("entró")
	window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
		function onFileSystemSuccess(fileSystem) { 
			alert("encontro LocalFileSystem")
			fileSystem.root.getFile("dummy.html", { create: true, exclusive: false },
				function gotFileEntry(fileEntry) { 
					var sPath = fileEntry.toURL().replace("dummy.html","");
					var fileTransfer = new FileTransfer();
					alert("creó file fileTransfer") 
					fileEntry.remove(); 
					fileTransfer.download(url, filePath, 
						function(theFile) { 
							alert("img updated") 
						},
						function(error) { 
							alert("Error source: "+ error.source)
						}
					);
				}, 
			fail); 
		}, 
	fail);
}*/

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}