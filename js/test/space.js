define(function(){
	
	function Space(id, position, walls, adiacents){
		
		this.getId = function(){
			return id;
		};
		this.getRow = function(){
			return position[0];
		};
		this.getColumn = function(){
			return position[1];
		};
		this.getWalls = function(){
			return walls;
		};
		this.getAdiacents = function(){
			return adiacents;
		};
	};
	
	return Space;
});