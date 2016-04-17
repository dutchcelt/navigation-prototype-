'use strict';
var domReady = function domReady() {
	return new Promise(function (resolve, reject) {
		document.readyState || reject('Can\'t resolve document readystate');
		var _listener = undefined;
		/d$|^i|^c/.test(document.readyState) ? resolve() : document.addEventListener('DOMContentLoaded', _listener = function listener(event) {
			document.removeEventListener('DOMContentLoaded', _listener);
			resolve();
		});
	});
};


domReady().then(function (msg) {

	var isTouch = undefined;
	var nav = document.querySelector( 'nav' );
	var isLargeViewport = function(){
		return window.matchMedia("(min-width: 640px)").matches;
	};

	function setUserInterfaceType( opts ){
		isTouch = opts.touched;
		if( isTouch ){
			nav.classList.add( 'touched' );
		} else {
			window.removeEventListener( 'orientationchange', handler );
		}
		document.body.removeEventListener( 'mouseover', handler );
		nav.removeEventListener( 'touchstart', handler );
	}
	function toggleCheckbox(){
		if ( isTouch ){
			var checked = nav.querySelector( ':checked' );
			if( checked ){
				requestAnimationFrame( function(){
					checked.checked = false;
				});
			}
		}
	}

	function handler( event ){
		switch( event.type ){
			case 'click':
				if( event.target.tagName === 'LABEL' && isLargeViewport() ){
					toggleCheckbox();
				}
				break;
			case 'orientationchange':
				toggleCheckbox();
				break;
			case 'mouseover':
				setUserInterfaceType( { touched: false } );
				break;
			case 'touchstart':
				setUserInterfaceType( { touched: true } );
				break;
			default:
				break;
		}
	}

	// The actual toggle handling;
	nav.addEventListener( 'click', handler, true );
	// Device rotation should clear the toggle
	window.addEventListener( 'orientationchange', handler );
	// Detect which type of User Interface (UI) is being used.
	document.body.addEventListener( 'mouseover', handler );
	nav.addEventListener( 'touchstart', handler );

}, function (err) {
	console.log(err);
});