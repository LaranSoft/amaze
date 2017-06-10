define(function(){
	
	var memory = {
		load: function(key){
			return JSON.parse(window.localStorage.getItem(key));
		},
		
		save: function(key, value){
			window.localStorage.setItem(key, JSON.stringify(value));
		}
	};
	
	if(!memory.load('inited')){
		memory.save('lastStage', 0);
		memory.save('tutorials', {});
		memory.save('objects', {});
		memory.save('accesses', 1);
		memory.save('inited', true);
	}
	
	return memory;
});