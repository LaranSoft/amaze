define(['gadget/gadget'], function(Gadget){

	var name = 'damage';
	
	function DamageGadget(id){
		Gadget.call(this, id, name);
	};
	
	DamageGadget.prototype = Object.create(Gadget.prototype);
	DamageGadget.prototype.constructor = DamageGadget;
	
	DamageGadget.prototype.applyTo = function(mazeController) {
		
		var gadgetId = this.getId();
		var spaceId = mazeController.getSpaceId(gadgetId);
		
		mazeController.addEnterFunction(spaceId, function(status){
			mazeController.destroyGadget(gadgetId);
			status.setUsedObject('life');
			status.removeLifePoint();
			
			status.addStatusBasedEffect(function(s){
				if(s.lifePoints() <= 0) {
					return -1;
				} else {
					return 0;
				}
			});
		});
	};
	
	return DamageGadget;
});