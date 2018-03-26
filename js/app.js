///////////////////
//Mobile Menu
///////////////////

$(".menu-icon").click(function(){
	//Adds class to .menu icon so CSS can change icon shape
	$(this).toggleClass( "active" );
	//Adds mobile nav so CSS can change make it appear
	$(".nav-area").toggleClass( "open" );
	//Stops scrolling when nav is open
	$("html").toggleClass( "overflow-hidden" );
});