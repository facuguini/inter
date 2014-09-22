$( document ).ready(function() {
	$("#bFecha").click(function () {
		tabs("fecha");
	});
	$("#bTabla").click(function () {
		tabs("tabla");
	});
	$("#bJug").click(function () {
		tabs("jug");
	});
	$("#rtabla").click(function(){
		$('#tablaweb').load(document.URL + ' #tablaweb');
	});
	$("#rfecha").click(function(){
		$('#fechaweb').load(document.URL + ' #fechaweb');
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
			$("#tabla").hide();
			$("#fecha").hide()
			break;
	}
}