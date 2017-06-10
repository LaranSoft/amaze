define(['gadget/gadget'], function(Gadget){

	var name = 'teleportSwitch';
	
	function TeleportSwitchGadget(id, identifier){
		Gadget.call(this, id, name, name + identifier);
		
		this.getIdentifier = function(){
			return identifier;
		};
	}
	
	TeleportSwitchGadget.prototype = Object.create(Gadget.prototype);
	TeleportSwitchGadget.prototype.constructor = TeleportSwitchGadget;
	
	TeleportSwitchGadget.prototype.applyTo = function(mazeController) {
		var self = this;
		
		// trovo la casella con l'altra placca di teletrasporto
		var spaceId = mazeController.getSpaceId(this.getId());
		
		mazeController.addEnterFunction(spaceId, function(status){
			mazeController.destroyGadget(self.getId());
			status.enableTeleport(self.getIdentifier());
		});
	};
	
	return TeleportSwitchGadget;
});