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