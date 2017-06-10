define(['support'], function(support){
	
	var defaultFunction = function(propertyName, value, css, duration, transitionValue){
		css[propertyName] = value;
		transitionValue[propertyName] = duration + 'ms';
	}, manager = {
		opacity: function(value, css, duration, transitionValue){
			defaultFunction('opacity', value, css, duration, transitionValue);
		},
		translate: function(value, css, duration, transitionValue){
			css[support.transformProperty] = 'translate(' + value[0] + 'px,' + value[1] + 'px)';
			transitionValue[support.transformValue] = duration + 'ms';
		},
		left: function(value, css, duration, transitionValue){
			defaultFunction('left', value, css, duration, transitionValue);
		},
		top: function(value, css, duration, transitionValue){
			defaultFunction('top', value, css, duration, transitionValue);
		}
	};
	
	return function($el, properties, duration, callback){

		var css = {}, transitionValue = {}, transitionValues = [], property, value;
		
		for(property in properties) {
			if(manager[property]) manager[property](properties[property], css, duration, transitionValue);
		}
		
		transitionValues = [];
		for(value in transitionValue){
			transitionValues.push(value + ' ' + transitionValue[value]);
		}
		
		css[support.transitionProperty] = transitionValues.join(', ');
	
		$el.one(support.transitionEnd, function(){
			$el.off(support.transitionEnd).css(support.transitionProperty, 'z-index 200ms');
			callback && setTimeout(callback, 0);
		}).css(css);
	}
	
});