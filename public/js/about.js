$(document).ready(function(){
	$("#about-toggle").click(function(){
		$("#about-wrapper").fadeIn('fast');
	});

	$("#about-close").click(function(){
		$("#about-wrapper").fadeOut('fast');
	});
});