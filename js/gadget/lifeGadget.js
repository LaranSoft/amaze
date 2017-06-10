define(['gadget/gadget'], function(Gadget){

	var name = 'life';
	
	function LifeGadget(id){
		Gadget.call(this, id, name);
	};
	
	LifeGadget.prototype = Object.create(Gadget.prototype);
	LifeGadget.prototype.constructor = LifeGadget;
	
	LifeGadget.prototype.applyTo = function(mazeController) {
		
		var gadgetId = this.getId();
		var spaceId = mazeController.getSpaceId(gadgetId);
		
		mazeController.addEnterFunction(spaceId, function(status){
			mazeController.destroyGadget(gadgetId);
			status.pushInSack('life');
			status.addLifePoint();
		});
	};
	
	return LifeGadget;
});