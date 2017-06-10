define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/forceDirectionGadget', 'gadget/exitGadget'], function(Space, Maze, StartGadget, ForceDirectionGadget, ExitGadget){

	return new Maze({
		size: [5, 5],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 6, 0]),
	    	new Space(2, [1, 1], 'eeoioioe', [0, 3, 7, 1]),
	    	new Space(3, [1, 2], 'eeoioioe', [0, 4, 8, 2]),
	    	new Space(4, [1, 3], 'eeoioioe', [0, 5, 9, 3]),
	    	new Space(5, [1, 4], 'eeeeoioe', [0, 0, 10, 4]),
	  	
	    	new Space(6, [2, 0], 'oioioeee', [1, 7, 11, 0]),
	    	new Space(7, [2, 1], 'oioioioi', [2, 8, 12, 6]),
	    	new Space(8, [2, 2], 'oioioioi', [3, 9, 13, 7]),
	    	new Space(9, [2, 3], 'oioeoioi', [4, 10, 14, 8]),
	    	new Space(10, [2, 4], 'oeeeeeoi', [5, 0, 0, 9]),
	  	
	    	new Space(11, [3, 0], 'oioioeee', [6, 12, 16, 0]),
	    	new Space(12, [3, 1], 'oioeoioi', [7, 13, 17, 11]),
	    	new Space(13, [3, 2], 'oioeeeoi', [8, 14, 0, 12]),
	    	new Space(14, [3, 3], 'oeeeeeoi', [9, 0, 0, 13]),
	  	
	    	new Space(16, [4, 0], 'oioeeeee', [11, 17, 0, 0]),
	    	new Space(17, [4, 1], 'oeeeeeoi', [12, 0, 0, 16])
		],
	    gadgets: [
	        {gadget: new StartGadget(0), position: [0, 2], fixed: false},
	        {gadget: new ExitGadget(1), position: [1, 4], fixed: true},
	        {gadget: new ForceDirectionGadget(2, 0), position: [2, 1], fixed: true}
	  	]
	});
});