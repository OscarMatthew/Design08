///////////////////
//Mobile Menu
///////////////////

$(".menu-icon").click(function(){
	//Adds class to .menu-icon so CSS can change icon shape
	$(this).toggleClass( "active" );
	//Adds mobile nav so CSS can change make it appear
	$(".nav-area-mobile").toggleClass( "open" );
	//Stops scrolling when nav is open
	$("html").toggleClass( "overflow-hidden" );
});

///////////////////
//Search
///////////////////

$(".search-btn").click(function(){
	$(".search-area").toggleClass("search-open");
	// add close-icon class to swap icons
	$(".search-btn").toggleClass("close-icon");
	// Stops scrolling when Search is open
	$("html").toggleClass( "overflow-hidden" );		
});


///////////////////
//Sub-Menu Items
///////////////////

//Target all .nav-area li items that have UL as children add class
//Mobile & Tablet
var subMenuItems = $( ".nav-area-mobile > ul > li:has(ul)" );

$(subMenuItems).addClass("child-menu");


///////////////////
//Last Word
///////////////////

$(".lastWord").html(function(){
	var text= $(this).text().trim().split(" ");
	var last = text.pop();
	return text.join(" ") + (text.length > 0 ? " <span class='red'>" + last + "</span>" : last);
  });


  ///////////////////
//Sermon Archive
///////////////////
$(".browse").click(function(){
	//Add class to make area full width
	$(".browse").toggleClass("active");
	$(".browse-content").toggleClass( "active" );
	$(".browse-wrapper").toggleClass( "active" );
	$(".browse").toggleClass("flip");
});