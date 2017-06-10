define(['gadget/gadget'], function(Gadget){

	var name = 'teleport';
	
	function TeleportGadget(id, identifier, enabled){
		var suffix = (enabled === false ? '0' : '1');
	
		this.getName = function(){
			return name + identifier + '_' + suffix;
		};
	
		Gadget.call(this, id, name + suffix, this.getName());
		
		enabled = enabled === false ? false : true;
		
		this.getIdentifier = function(){
			return identifier;
		};
		
		this.isEnabled = function(){
			return enabled;
		};
	}
	
	TeleportGadget.prototype = Object.create(Gadget.prototype);
	TeleportGadget.prototype.constructor = TeleportGadget;
	
	TeleportGadget.prototype.canBePlacedIn = function(mazeController, spaceId) {
		
		var adiacents = mazeController.getAdiacents(spaceId);
		
		for(var i=0; i<adiacents.length; i++){
			if(adiacents[i] != 0){
				var gadgetName = mazeController.getGadgetName(adiacents[i]);
				var gadgetId = mazeController.getGadgetId(adiacents[i]);
				if(gadgetName === this.getName() && gadgetId !== this.getId()) return false;
			}
		}
		return true;
	};
	
	TeleportGadget.prototype.applyTo = function(mazeController) {
		var self = this;
		
		// trovo la casella con l'altra placca di teletrasporto
		var spaceId = mazeController.getSpaceId(this.getId());
		
		var spaceIds = mazeController.getSpaceIds(this.getName());
		
		// spaceIds length deve essere pari a 2 per forza
		var destinationSpaceId = spaceIds[0];
		if(destinationSpaceId == spaceId) destinationSpaceId = spaceIds[1];
		
		mazeController.addEnterFunction(spaceId, function(status){
			if(self.isEnabled() === false && !status.hasTeleportBeenEnabled(self.getIdentifier())){
				status.addStatusBasedEffect(function(s){
					return -1;
				});
			} else {
				if(!status.isTeleportUsed(self.getIdentifier())){
					status.setIsTeleportUsed(self.getIdentifier());
					status.setRedirect(destinationSpaceId);
				}
			}
		});
	};
	
	return TeleportGadget;
});