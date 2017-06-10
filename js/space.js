define(function(){
	
	var defaultOptions = {
		free: true, 
		exceptions: [], 
		gadget: null,
		doors: []
	};
	
	function Space(id, position, walls, adiacents, options){
		options = $.extend({}, defaultOptions, options);
		
		this.getId = function(){
			return id;
		};
		this.getPosition = function(){
			return position;
		};
		this.getWalls = function(){
			return walls;
		};
		this.getAdiacents = function(){
			return adiacents;
		};
		
		this.isFree = function(){
			return options.free;
		};
		this.refuse = function(gadget){
			return options.exceptions && options.exceptions.indexOf(gadget.name) != -1;
		}
		this.getGadget = function(){
			return options.gadget;
		}
		this.getDoors = function(){
			return options.doors;
		}
	};
	
	return Space;
});

//Space.prototype.reset = function(){
//	this.removableGadget = null;
//	var gadget = this.getDOMGadget();
//	gadget && gadget.show();
//};
//
//Space.prototype.setDOMSpaceElement = function($el){
//	this.$el = $el;
//};
//
//Space.prototype.setDOMGadget = function($gadget, fixed){
//	if(fixed) this.$gadget = $gadget;
//	else this.$removableGadget = $gadget;
//};
//
//Space.prototype.getDOMGadget = function(){
//	return this.$gadget || this.$removableGadget;
//};
//
//Space.prototype.setGadget = function(gadget){
//	this.removableGadget = gadget;
//};
//
//Space.prototype.getGadget = function(){
//	return this.removableGadget || this.fixedGadget;
//};
//
//Space.prototype.removeGadget = function(gadget){
//	if(this.removableGadget && this.removableGadget.id == gadget.id){
//		this.removableGadget = null;
//		return true;
//	};
//	return false;
//};
//
//Space.prototype.isPlaceable = function(gadget, maze){
//	if(!this.free) return false;
//	if(this.exceptions.indexOf(gadget.name) != -1) return false;
//	if(this.fixedGadget) return false;
//	if(this.removableGadget) return false;
//	
//	return gadget.canBePlacedIn(this, maze);
//};
//
//Space.prototype.getAdiacents = function(mazeDescriptor){
//	if(!mazeDescriptor) return this.adiacents;
//	if(this.doors.length == 0) return mazeDescriptor.adiacents[this.id];
//	
//	var adiacents = mazeDescriptor.adiacents[this.id];
//	var retVal = [];
//	for(var i=0; i<adiacents.length; i++){
//		if(this.doors.indexOf(adiacents[i]) == -1 || mazeDescriptor.status.keys > 0){
//			retVal.push(adiacents[i]);
//		}
//	}
//	
//	return retVal;
//};
//
//Space.prototype.setSelectable = function(selectable, callback){
//	if(selectable === true){
//		var self = this;
//		
//		this.$el.placingTarget.show();
//		this.$el.placingTarget.plate.show().off('click').on('click', function(){
//			callback(self);
//		});
//	} else {
//		this.$el.placingTarget.plate.off('click').hide();
//		this.$el.placingTarget.hide();
//	}
//};