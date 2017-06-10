// define(['trd/jquery-touchwipe'], function(){

	// return {
		// click: 'click',
		// touchstart: 'touchstart',
		// listenMovements: function($el, goLeft, goRight, goDown, goUp){
			// $el.touchwipe({
				// wipeLeft: goLeft,
				// wipeRight: goRight,
				// wipeUp: goDown,
				// wipeDown: goUp,
				// min_move_x: 40,
				// min_move_y: 40,
				// preventDefaultEvents: true
			// });
		// },
		// confirm: function(confirmMessage, callback, confirmTitle, messages){
			// navigator.notification.confirm(confirmMessage, callback, confirmTitle, messages);
		// }
	// }

// });

define(function(){

	return {
		click: 'click',
		touchstart: 'touchstart'
	}

});