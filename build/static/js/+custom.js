$(document).ready(function() {

	//custom scripting goes here


	$("#top-nav-wrapper").delay(800).slideDown();
	setTimeout(function(){
		$("#top-nav-1").delay(1500).addClass("active");
	}, 1200);



	// Makes bottom nav slide up and down

	var slideBottom = $('#dfpAdPositionTop').offset().top;       // get initial position of the element


	$(window).scroll(function() {                  // assign scroll event listener

	    var currentScroll = $(window).scrollTop(); // get current position

	    if (currentScroll >= slideBottom) {
	        $("#bottom-nav-wrapper").slideDown(800);
	    }
		// else { $("#bottom-nav-wrapper").slideUp(800); }


	});



	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
