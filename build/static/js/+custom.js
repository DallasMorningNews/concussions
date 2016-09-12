$(document).ready(function() {

	//custom scripting goes here


	$("#top-nav-wrapper").delay(800).slideDown();
	setTimeout(function(){
		$("#top-nav-1").delay(1500).addClass("active");
	}, 1200);



	// Makes bottom nav slide up and down

		// get initial position of the element
		var flipAttr = $('.quote-wrapper1').offset().top;

		// assign scroll event listener
		$(window).scroll(function() {

		    var currentScroll = $(window).scrollTop() + ($(window).height() / 4); // get current position

			console.log(currentScroll, flipAttr);

		    if (currentScroll >= flipAttr) {
		        $(".trigger-quote").addClass("flip");
		    }


		});



	// injecting current year into footer
	// DO NOT DELETE

	var d = new Date();
	var year = d.getFullYear();

	$('.copyright').text(year);


	// some code blocks require javascript to function, like slideshows, synopsis blocks, etc
	// you can find that code here: https://github.com/DallasMorningNews/generator-dmninteractives/wiki/Cookbook



});
