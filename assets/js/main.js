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
	$(".browse-dropdown-area").toggleClass("active");
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



/*!
 * css-var-polyfill.js - v1.0.0
 *
 * Copyright (c) 2018 Aaron Barker <http://aaronbarker.net>
 * Released under the MIT license
 *
 * Date: 2018-03-09
 */
let cssVarPoly = {
	init: function() {
	  // first lets see if the browser supports CSS variables
	  // No version of IE supports window.CSS.supports, so if that isn't supported in the first place we know CSS variables is not supported
	  // Edge supports supports, so check for actual variable support
	  if (window.CSS && window.CSS.supports && window.CSS.supports('(--foo: red)')) {
		// this browser does support variables, abort
		console.log('your browser supports CSS variables, aborting and letting the native support handle things.');
		return;
	  } else {
		// edge barfs on console statements if the console is not open... lame!
		console.log('no support for you! polyfill all (some of) the things!!');
		document.querySelector('body').classList.add('cssvars-polyfilled');
	  }
  
	  cssVarPoly.ratifiedVars = {};
	  cssVarPoly.varsByBlock = {};
	  cssVarPoly.oldCSS = {};
	  
	  // start things off
	  cssVarPoly.findCSS();
	  cssVarPoly.updateCSS();
	},
	
	// find all the css blocks, save off the content, and look for variables
	findCSS: function() {
	  let styleBlocks = document.querySelectorAll('style:not(.inserted),link[rel="stylesheet"]');
  
	  // we need to track the order of the style/link elements when we save off the CSS, set a counter
	  let counter = 1;
  
	  // loop through all CSS blocks looking for CSS variables being set
	  [].forEach.call(styleBlocks, function(block) {
		// console.log(block.nodeName);
		let theCSS;
		if (block.nodeName === 'STYLE') {
		  // console.log("style");
		  theCSS = block.innerHTML;
		  cssVarPoly.findSetters(theCSS, counter);
		} else if (block.nodeName === 'LINK') {
		  // console.log("link");
		  cssVarPoly.getLink(block.getAttribute('href'), counter, function(counter, request) {
			cssVarPoly.findSetters(request.responseText, counter);
			cssVarPoly.oldCSS[counter] = request.responseText;
			cssVarPoly.updateCSS();
		  });
		  theCSS = '';
		}
		// save off the CSS to parse through again later. the value may be empty for links that are waiting for their ajax return, but this will maintain the order
		cssVarPoly.oldCSS[counter] = theCSS;
		counter++;
	  });
	},
  
	// find all the "--variable: value" matches in a provided block of CSS and add them to the master list
	findSetters: function(theCSS, counter) {
	  // console.log(theCSS);
	  cssVarPoly.varsByBlock[counter] = theCSS.match(/(--.+:.+;)/g) || [];
	},
  
	// run through all the CSS blocks to update the variables and then inject on the page
	updateCSS: function() {
	  // first lets loop through all the variables to make sure later vars trump earlier vars
	  cssVarPoly.ratifySetters(cssVarPoly.varsByBlock);
  
	  // loop through the css blocks (styles and links)
	  for (let curCSSID in cssVarPoly.oldCSS) {
		// console.log("curCSS:",oldCSS[curCSSID]);
		let newCSS = cssVarPoly.replaceGetters(cssVarPoly.oldCSS[curCSSID], cssVarPoly.ratifiedVars);
		// put it back into the page
		// first check to see if this block exists already
		if (document.querySelector('#inserted' + curCSSID)) {
		  // console.log("updating")
		  document.querySelector('#inserted' + curCSSID).innerHTML = newCSS;
		} else {
		  // console.log("adding");
		  var style = document.createElement('style');
		  style.type = 'text/css';
		  style.innerHTML = newCSS;
		  style.classList.add('inserted');
		  style.id = 'inserted' + curCSSID;
		  document.getElementsByTagName('head')[0].appendChild(style);
		}
	  };
	},
  
	// parse a provided block of CSS looking for a provided list of variables and replace the --var-name with the correct value
	replaceGetters: function(curCSS, varList) {
	  // console.log(varList);
	  for (let theVar in varList) {
		// console.log(theVar);
		// match the variable with the actual variable name
		let getterRegex = new RegExp('var\\(\\s*' + theVar + '\\s*\\)', 'g');
		// console.log(getterRegex);
		// console.log(curCSS);
		curCSS = curCSS.replace(getterRegex, varList[theVar]);
  
		// now check for any getters that are left that have fallbacks
		let getterRegex2 = new RegExp('var\\(\\s*.+\\s*,\\s*(.+)\\)', 'g');
		// console.log(getterRegex);
		// console.log(curCSS);
		let matches = curCSS.match(getterRegex2);
		if (matches) {
		  // console.log("matches",matches);
		  matches.forEach(function(match) {
			// console.log(match.match(/var\(.+,\s*(.+)\)/))
			// find the fallback within the getter
			curCSS = curCSS.replace(match, match.match(/var\(.+,\s*(.+)\)/)[1]);
		  });
  
		}
  
		// curCSS = curCSS.replace(getterRegex2,varList[theVar]);
	  };
	  // console.log(curCSS);
	  return curCSS;
	},
  
	// determine the css variable name value pair and track the latest
	ratifySetters: function(varList) {
	  // console.log("varList:",varList);
	  // loop through each block in order, to maintain order specificity
	  for (let curBlock in varList) {
		let curVars = varList[curBlock];
		// console.log("curVars:",curVars);
		// loop through each var in the block
		curVars.forEach(function(theVar) {
		  // console.log(theVar);
		  // split on the name value pair separator
		  let matches = theVar.split(/:\s*/);
		  // console.log(matches);
		  // put it in an object based on the varName. Each time we do this it will override a previous use and so will always have the last set be the winner
		  // 0 = the name, 1 = the value, strip off the ; if it is there
		  cssVarPoly.ratifiedVars[matches[0]] = matches[1].replace(/;/, '');
		});
	  };
	  // console.log(ratifiedVars);
	},
  
	// get the CSS file (same domain for now)
	getLink: function(url, counter, success) {
	  var request = new XMLHttpRequest();
	  request.open('GET', url, true);
	  request.overrideMimeType('text/css;');
	  request.onload = function() {
		if (request.status >= 200 && request.status < 400) {
		  // Success!
		  // console.log(request.responseText);
		  if (typeof success === 'function') {
			success(counter, request);
		  }
		} else {
		  // We reached our target server, but it returned an error
		  console.warn('an error was returned from:', url);
		}
	  };
  
	  request.onerror = function() {
		// There was a connection error of some sort
		console.warn('we could not get anything from:', url);
	  };
  
	  request.send();
	}
  };
  
  cssVarPoly.init();