define(['gadget/gadget'], function(Gadget){

	var name = 'bowTrap';
	
	function BowTrapGadget(id){
		Gadget.call(this, id, name);
	}
	
	BowTrapGadget.prototype = Object.create(Gadget.prototype);
	BowTrapGadget.prototype.constructor = BowTrapGadget;
	
	BowTrapGadget.prototype.applyTo = function(mazeController) {
		var self = this;
		var gadgetId = self.getId();

		var trigger = function(status){
			if(!status.isBowTrapUsed(gadgetId)){
				status.setBowTrapUsed(gadgetId);
				
				status.removeLifePoint();
				
				mazeController.destroyGadget(gadgetId);
				status.setUsedObject('life');
				
				status.addStatusBasedEffect(function(s){
					if(s.lifePoints() <= 0) {
						return -1;
					} else {
						return 0;
					}
				});
			}
		};
		
		var spaceId = mazeController.getSpaceId(gadgetId);
		
		var originalAdiacents = mazeController.getAdiacents(spaceId);
		for(var i=0; i<4; i++){
			var adiacents = originalAdiacents;
			while(adiacents[i] != 0){
				mazeController.addEnterFunction(adiacents[i], trigger);
				adiacents = mazeController.getAdiacents(adiacents[i]);
			}
		}
	};
	
	return BowTrapGadget;
});