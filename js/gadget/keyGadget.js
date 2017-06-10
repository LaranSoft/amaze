define(['gadget/gadget'], function(Gadget){

	var name = 'key';
	
	function KeyGadget(id){
		Gadget.call(this, id, name);
	};
	
	KeyGadget.prototype = Object.create(Gadget.prototype);
	KeyGadget.prototype.constructor = KeyGadget;
	
	KeyGadget.prototype.applyTo = function(mazeController) {
		
		var gadgetId = this.getId();
		var spaceId = mazeController.getSpaceId(gadgetId);
		
		mazeController.addEnterFunction(spaceId, function(status){
			mazeController.destroyGadget(gadgetId);
			status.pushInSack('key');
			status.addEots(function(s){
				s.addKey();
			});
		});
	};
	
	return KeyGadget;
});