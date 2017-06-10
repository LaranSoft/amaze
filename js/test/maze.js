define(function(){
	
	/**
	 * VARIABILI PRIVATE
	 */
	var defaultOptions = {
		size: [0, 0], 
		spaces: [], 
		gadgets: [],
		doors: [],
		obstacles: [],
		tutorials: [],
		solution: [],
		credits: '',
		events: [],
		isLast: false
	};
	
	/**
	 * METODI ESPORTATI
	 */
	function Maze(options){
		options = options || {};
		options = $.extend({}, defaultOptions, options);

		this.getWidth = function(){
			return options.size[1];
		}
		
		this.getHeight = function(){
			return options.size[0];
		}
		
		this.getSpaces = function(){
			return options.spaces;
		}
		
		this.getGadgets = function(){
			return options.gadgets;
		}
		
		this.getDoors = function(){
			return options.doors;
		}
		
		this.getObstacles = function(){
			return options.obstacles;
		}
		
		this.getTutorials = function(){
			return options.tutorials;
		}
		
		this.getSolution = function(){
			return options.solution;
		}
		
		this.getCredits = function(){
			return options.credits;
		}
		
		this.getEvents = function(){
			return options.events;
		}
		
		this.isLast = function(){
			return options.isLast;
		}
	};
	
	return Maze;
});