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
		//DownloadFile("http://360sports.com.ar/images/horarios_domingos.jpg", "images", "horarios_domingos");
		$('#iwfecha').attr("src","images/horarios_domingos.jpg");
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


	DownloadFile("http://360sports.com.ar/images/horarios_domingos.jpg", "images", "horarios_domingos");
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

//First step check parameters mismatch and checking network connection if available call    download function
function DownloadFile(URL, Folder_Name, File_Name) {
	if (URL == null && Folder_Name == null && File_Name == null) {
	    return;
	}
	else {
	   	var networkState = navigator.connection.type;
	    if (networkState == Connection.NONE) {
	        return;
	    } else {
	        download(URL, Folder_Name, File_Name); //If available download function call
	    }
	}
}

function download(URL, Folder_Name, File_Name) {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

function fileSystemSuccess(fileSystem) {
    var download_link = encodeURI(URL);
    ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    var fp = rootdir.fullPath; // Returns Fulpath of local directory

    fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
    // download function call
    filetransfer(download_link, fp);
}

function onDirectorySuccess(parent) {
}

function onDirectoryFail(error) {
    alert("Unable to create new directory: " + error.code);
}

  function fileSystemFail(evt) {
    alert(evt.target.error.code);
 }
}

function filetransfer(download_link, fp) {
var fileTransfer = new FileTransfer();
// File download function with URL and local path
fileTransfer.download(download_link, fp,
                    function (entry) {
                        alert("download complete: " + entry.fullPath);
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                     //alert("download error target " + error.target);
                     //alert("upload error code" + error.code);
                 }
            );
}