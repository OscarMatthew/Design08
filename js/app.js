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

///////////////////
//Sub-Menu Items
///////////////////

//Target all .nav-area li items that have UL as children add class
//Mobile & Tablet
var subMenuItems = $( ".nav-area > ul > li:has(ul)" );
// var menuChild = $('<button class="more"></button>');

$(subMenuItems).addClass("child-menu");