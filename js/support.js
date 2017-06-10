define(['getStyleProperty'], function(getStyleProperty){
	
	var transitionEnds = [
	  'transitionend'
	  , 'webkitTransitionEnd'
	  , 'oTransitionEnd'
	  , 'MSTransitionEnd'
	  , 'animationend'
	  , 'webkitAnimationEnd'
	  , 'oAnimationEnd'
	  , 'MSAnimationEnd'
	];
	
	var transitionMap = {
		'transform' : 'transform',
		'WebkitTransform' : '-webkit-transform',
		'MozTransform': '-moz-transform',
		'msTransform' : '-ms-transform',
		'MsTransform' : '-ms-transform',
		'OTransform' : '-o-transform'
	};
	
	var transformProperty = getStyleProperty('transform');
	
	return {
		transitionProperty: getStyleProperty('transition'),
		transformProperty: transformProperty,
		transformValue: transitionMap[transformProperty],
		transitionEnd: transitionEnds.join(' ')
	};
	
});