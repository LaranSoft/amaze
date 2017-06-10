define(['gadget/gadget'], function(Gadget){

	var name = 'exit';
	
	var enterFunction = function(status){
		status.addStatusBasedEffect(function(s){
			if(s.hasUnvisitedSpaces() === true) return -1;
			else return 1;
		});
	};
	
	function ExitGadget(id){
		Gadget.call(this, id, name);
	}
	
	ExitGadget.prototype = Object.create(Gadget.prototype);
	ExitGadget.prototype.constructor = ExitGadget;
	
	ExitGadget.prototype.applyTo = function(mazeController) {
		var spaceId = mazeController.getSpaceId(this.getId());
		
		mazeController.addEnterFunction(spaceId, enterFunction);
	};
	
	return ExitGadget;
});