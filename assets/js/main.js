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


///////////////////
// Event Tab
///////////////////

$(".tab-links .calender").click(function(){
	$(".events").addClass("calender-open");
	$(".calender").addClass("current");
	$(".list").removeClass("current");		
});

$(".tab-links .list").click(function(){
	$(".events").removeClass("calender-open");
	$(".list").addClass("current");	
	$(".calender").removeClass("current");
});


//////////////////////////////////////
// Audio/Video Player
//////////////////////////////////////

//Audio Player.js

/* 
Stunning HTML5 Player for Audio Streaming
AUTHOR: Junaid Khalid
URL: https://www.mymediaelements.com
*/


;(function( $, window, document, undefined )
{
	var isTouch		  = 'ontouchstart' in window,
		eStart		  = isTouch ? 'touchstart'	: 'mousedown',
		eMove		  = isTouch ? 'touchmove'	: 'mousemove',
		eEnd		  = isTouch ? 'touchend'	: 'mouseup',
		eCancel		  = isTouch ? 'touchcancel'	: 'mouseup',
		secondsToTime = function( secs )
		{
			var hours = Math.floor( secs / 3600 ), minutes = Math.floor( secs % 3600 / 60 ), seconds = Math.ceil( secs % 3600 % 60 );
			return ( hours == 0 ? '' : hours > 0 && hours.toString().length < 2 ? '0'+hours+':' : hours+':' ) + ( minutes.toString().length < 2 ? '0'+minutes : minutes ) + ':' + ( seconds.toString().length < 2 ? '0'+seconds : seconds );
		},
		canPlayType	  = function( file )
		{
			var audioElement = document.createElement( 'audio' );
			return !!( audioElement.canPlayType && audioElement.canPlayType( 'audio/' + file.split( '.' ).pop().toLowerCase() + ';' ).replace( /no/, '' ) );
		};

	$.fn.audioPlayer = function( params )
	{
		var params		= $.extend( { classPrefix: 'audioplayer', strPlay: 'Play', strPause: 'Pause', strVolume: 'Volume' }, params ),
			cssClass	= {},
			cssClassSub =
			{
				playPause:	 	'playpause',
				playing:		'playing',
				time:		 	'time',
				timeCurrent:	'time-current',
				timeDuration: 	'time-duration',
				bar: 			'bar',
				barLoaded:		'bar-loaded',
				barPlayed:		'bar-played',
				volume:		 	'volume',
				volumeButton: 	'volume-button',
				volumeAdjust: 	'volume-adjust',
				noVolume: 		'novolume',
				mute: 			'mute',
				mini: 			'mini'
			};

		for( var subName in cssClassSub )
			cssClass[ subName ] = params.classPrefix + '-' + cssClassSub[ subName ];

		this.each( function()
		{
			if( $( this ).prop( 'tagName' ).toLowerCase() != 'audio' )
				return false;

			var $this	   = $( this ),
				audioFile  = $this.attr( 'src' ),
				isAutoPlay = $this.get( 0 ).getAttribute( 'autoplay' ), isAutoPlay = isAutoPlay === '' || isAutoPlay === 'autoplay' ? true : false,
				isLoop	   = $this.get( 0 ).getAttribute( 'loop' ),		isLoop	   = isLoop		=== '' || isLoop	 === 'loop'		? true : false,
				isSupport  = false;

			if( typeof audioFile === 'undefined' )
			{
				$this.find( 'source' ).each( function()
				{
					audioFile = $( this ).attr( 'src' );
					if( typeof audioFile !== 'undefined' && canPlayType( audioFile ) )
					{
						isSupport = true;
						return false;
					}
				});
			}
			else if( canPlayType( audioFile ) ) isSupport = true;

			var thePlayer = $( '<div class="' + params.classPrefix + '">' + ( isSupport ? $( '<div>' ).append( $this.eq( 0 ).clone() ).html() : '<embed src="' + audioFile + '" width="0" height="0" volume="100" autostart="' + isAutoPlay.toString() +'" loop="' + isLoop.toString() + '" />' ) + '<div class="' + cssClass.playPause + '" title="' + params.strPlay + '"><a href="#">' + params.strPlay + '</a></div></div>' ),
				theAudio  = isSupport ? thePlayer.find( 'audio' ) : thePlayer.find( 'embed' ), theAudio = theAudio.get( 0 );

			if( isSupport )
			{
				thePlayer.find( 'audio' ).css( { 'width': 0, 'height': 0, 'visibility': 'hidden' } );
				thePlayer.append( '<div class="' + cssClass.time + ' ' + cssClass.timeCurrent + '"></div><div class="' + cssClass.bar + '"><div class="' + cssClass.barLoaded + '"></div><div class="' + cssClass.barPlayed + '"></div></div><div class="' + cssClass.time + ' ' + cssClass.timeDuration + '"></div></div>' );

				var theBar			  = thePlayer.find( '.' + cssClass.bar ),
					barPlayed	 	  = thePlayer.find( '.' + cssClass.barPlayed ),
					barLoaded	 	  = thePlayer.find( '.' + cssClass.barLoaded ),
					timeCurrent		  = thePlayer.find( '.' + cssClass.timeCurrent ),
					timeDuration	  = thePlayer.find( '.' + cssClass.timeDuration ),
					volumeButton	  = thePlayer.find( '.' + cssClass.volumeButton ),
					volumeAdjuster	  = thePlayer.find( '.' + cssClass.volumeAdjust + ' > div' ),
					volumeDefault	  = 0,
					adjustCurrentTime = function( e )
					{
						theRealEvent		 = isTouch ? e.originalEvent.touches[ 0 ] : e;
						theAudio.currentTime = Math.round( ( theAudio.duration * ( theRealEvent.pageX - theBar.offset().left ) ) / theBar.width() );
					},
					adjustVolume = function( e )
					{
						theRealEvent	= isTouch ? e.originalEvent.touches[ 0 ] : e;
						theAudio.volume = Math.abs( ( theRealEvent.pageY - ( volumeAdjuster.offset().top + volumeAdjuster.height() ) ) / volumeAdjuster.height() );
					},
					updateLoadBar = setInterval( function()
					{
						barLoaded.width( ( theAudio.buffered.end( 0 ) / theAudio.duration ) * 100 + '%' );
						if( theAudio.buffered.end( 0 ) >= theAudio.duration )
							clearInterval( updateLoadBar );
					}, 100 );

				var volumeTestDefault = theAudio.volume, volumeTestValue = theAudio.volume = 0.111;
				if( Math.round( theAudio.volume * 1000 ) / 1000 == volumeTestValue ) theAudio.volume = volumeTestDefault;
				else thePlayer.addClass( cssClass.noVolume );

				timeDuration.html( '&hellip;' );
				timeCurrent.text( secondsToTime( 0 ) );

				theAudio.addEventListener( 'loadeddata', function()
				{
					timeDuration.text( secondsToTime( theAudio.duration ) );
					volumeAdjuster.find( 'div' ).height( theAudio.volume * 100 + '%' );
					volumeDefault = theAudio.volume;
				});

				theAudio.addEventListener( 'timeupdate', function()
				{
					timeCurrent.text( secondsToTime( theAudio.currentTime ) );
					barPlayed.width( ( theAudio.currentTime / theAudio.duration ) * 100 + '%' );
				});

				theAudio.addEventListener( 'volumechange', function()
				{
					volumeAdjuster.find( 'div' ).height( theAudio.volume * 100 + '%' );
					if( theAudio.volume > 0 && thePlayer.hasClass( cssClass.mute ) ) thePlayer.removeClass( cssClass.mute );
					if( theAudio.volume <= 0 && !thePlayer.hasClass( cssClass.mute ) ) thePlayer.addClass( cssClass.mute );
				});

				theAudio.addEventListener( 'ended', function()
				{
					thePlayer.removeClass( cssClass.playing );
				});

				theBar.on( eStart, function( e )
				{
					adjustCurrentTime( e );
					theBar.on( eMove, function( e ) { adjustCurrentTime( e ); } );
				})
				.on( eCancel, function()
				{
					theBar.unbind( eMove );
				});

				volumeButton.on( 'click', function()
				{
					if( thePlayer.hasClass( cssClass.mute ) )
					{
						thePlayer.removeClass( cssClass.mute );
						theAudio.volume = volumeDefault;
					}
					else
					{
						thePlayer.addClass( cssClass.mute );
						volumeDefault = theAudio.volume;
						theAudio.volume = 0;
					}
					return false;
				});

				volumeAdjuster.on( eStart, function( e )
				{
					adjustVolume( e );
					volumeAdjuster.on( eMove, function( e ) { adjustVolume( e ); } );
				})
				.on( eCancel, function()
				{
					volumeAdjuster.unbind( eMove );
				});
			}
			else thePlayer.addClass( cssClass.mini );

			if( isAutoPlay ) thePlayer.addClass( cssClass.playing );

			thePlayer.find( '.' + cssClass.playPause ).on( 'click', function()
			{
				if( thePlayer.hasClass( cssClass.playing ) )
				{
					$( this ).attr( 'title', params.strPlay ).find( 'a' ).html( params.strPlay );
					thePlayer.removeClass( cssClass.playing );
					isSupport ? theAudio.pause() : theAudio.Stop();
				}
				else
				{
					$( this ).attr( 'title', params.strPause ).find( 'a' ).html( params.strPause );
					thePlayer.addClass( cssClass.playing );
					isSupport ? theAudio.play() : theAudio.Play();
				}
				return false;
			});

			$this.replaceWith( thePlayer );
		});
		return this;
	};
})( jQuery, window, document );


//tabs.js

//Variable Setup
var watchTab = $( ".watch-tab" );
var listenTab = $('.listen-tab');
var downloadTab = $('.download-tab');
var watchContent = $( "#watch-content" );
var listenContent = $('#listen-content');
var downloadItems = $('.download-tab > ul');
var tabNav = $('nav.tabs');
var mobileClickAway = $('.dropdown-backdrop');

//Toggle to listen content when click listen
$(listenTab).click(function(){	
	$(watchContent).removeClass('active');
	$(listenContent).addClass('active');
	$(watchTab).removeClass('active');
	$(this).addClass('active');
});

//Toggle to watch content when click watch
$(watchTab).click(function(){	
	$(listenContent).removeClass('active');	
	$(watchContent).addClass('active');
	$(listenTab).removeClass('active');
	$(this).addClass('active');
});

//Toggle download dropdown content when click watch & when click away
$(downloadTab).click(function(e){
	$(downloadItems).fadeToggle();
	$(downloadItems).toggleClass('active');
	e.stopPropagation();
	$(this).toggleClass('active');
//	if mobile we use a backdrop because click events don't delegate
//	if('ontouchstart' in document.documentElement) {
//		$('<div class="dropdown-backdrop"></div>').appendTo('body');
//		$('.dropdown-backdrop').click(function(){
//			$('div').remove('.dropdown-backdrop');
//		});
//		$(downloadTab).click(function(i){
//			$('div').remove('.dropdown-backdrop');
//			i.stopPropagation();
//		});
//	};
});

//Hide dropdown when click away
$(document).click(function() {
	if($(downloadItems).hasClass('active')){
		$(downloadItems).fadeToggle();
		$(downloadItems).removeClass('active');
		$(downloadTab).removeClass('active');
	}
});