define(['jquery'], function($){
	
	function clone(property){
		if($.isArray(property)){
			return cloneArray(property);
		} else if($.isPlainObject(property)){
			return cloneObject(property);
		} else return property;
	}
	
	function cloneObject(object){
		var copy = {}, prop, property;
		for(prop in object){
			property = object[prop];
			
			copy[prop] = clone(property);
		}
		return copy;
	}
	
	function cloneArray(array){
		var copy = [], i, len, property;
		
		for(i=0, len=array.length; i<len; i++){
			property = array[i];
			
			copy[i] = clone(property);
		}
		return copy;
	}
	
	return clone;
});