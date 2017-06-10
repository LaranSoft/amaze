define(['gadget/gadget'], function(Gadget){

	var name = 'forceDirection';
	
	function ForceDirectionGadget(id, direction){
		
		this.direction = direction;
		
		Gadget.call(this, id, name, name + direction);
	}
	
	ForceDirectionGadget.prototype = Object.create(Gadget.prototype);
	ForceDirectionGadget.prototype.constructor = ForceDirectionGadget;
	
	ForceDirectionGadget.prototype.applyTo = function(mazeController) {
		var spaceId = mazeController.getSpaceId(this.getId());
		
		var oldAdiacents = mazeController.getAdiacents(spaceId);
		
		var newAdiacents = [0, 0, 0, 0];
		newAdiacents[this.direction] = oldAdiacents[this.direction];
		
		mazeController.setAdiacents(spaceId, newAdiacents);
		
	};
	
	return ForceDirectionGadget;
});