define(['memory'], function(memory){
	
	var memoryObjects = memory.load('objects') || {};
	
	function Gadget(id, radix, name){
		name = name || radix;
		
		this.getId = function(){
			return id;
		};
		
		this.getName = function(){
			return name;
		};
		
		if(memoryObjects[radix] !== true){
			memoryObjects[radix] = true;
			memory.save('objects', memoryObjects);
		}
	};
	
	Gadget.prototype.applyTo = function(mazeDescriptor) {};
	
	Gadget.prototype.canBePlacedIn = function(mazeDescriptor, spaceId) {return true;};
	
	return Gadget;
});