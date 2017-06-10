define(function(){
	
	function Tutorial(id, objects){
	
		this.id = id;
		this.totalHeight = 0;
		this.objects = objects;
		
		for(var i=0; i<objects.length; i++){
			var object = objects[i];
			
			this.totalHeight += object.height;
			
		}
	}
	
	return Tutorial;
});