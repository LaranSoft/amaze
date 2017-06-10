define(['gadget/gadget'], function(Gadget){

	var name = 'seal';
	
	function SealGadget(id){
		Gadget.call(this, id, name);
	}
	
	SealGadget.prototype = Object.create(Gadget.prototype);
	SealGadget.prototype.constructor = SealGadget;
	
	return SealGadget;
});