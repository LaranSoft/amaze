define(['gadget/gadget'], function(Gadget){
	
	var name = 'start';
	
	function StartGadget(id){
		Gadget.call(this, id, name);
	}
	
	StartGadget.prototype = Object.create(Gadget.prototype);
	StartGadget.prototype.constructor = StartGadget;
	
	StartGadget.prototype.applyTo = function(mazeController) {
		mazeController.setStart(mazeController.getSpaceId(this.getId()));
	};
	
	return StartGadget;
});