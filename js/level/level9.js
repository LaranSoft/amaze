define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/sealGadget', 'gadget/keyGadget'], function(Space, Maze, StartGadget, ExitGadget, SealGadget, KeyGadget){

	return new Maze({
		
		size: [4, 4],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
	    	new Space(2, [1, 1], 'eeoiiioe', [0, 3, 0, 1]),
	    	new Space(3, [1, 2], 'eeoioioe', [0, 4, 7, 2]),
	    	new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
	  	
	    	new Space(5, [2, 0], 'oioeeeee', [1, 6, 0, 0]),
	    	new Space(6, [2, 1], 'iioioeoi', [0, 7, 9, 5]),
	    	new Space(7, [2, 2], 'oioioioi', [3, 8, 10, 6]),
	    	new Space(8, [2, 3], 'oeeeoioi', [4, 0, 11, 7]),
	  	
	    	new Space(9, [3, 1], 'oioeeeee', [6, 10, 0, 0]),
	    	new Space(10, [3, 2], 'oioeeeoi', [7, 11, 0, 9]),
	    	new Space(11, [3, 3], 'oeeeeeoi', [8, 0, 0, 10])
		],
	    gadgets: [
	        {gadget: new StartGadget(0), position: [0, 2], fixed: false},
	        {gadget: new KeyGadget(1), position: [1, 0], fixed: true},
	        {gadget: new KeyGadget(2), position: [1, 2], fixed: true},
	        {gadget: new ExitGadget(3), position: [1, 3], fixed: true}
	  	],
		doors: [
		    [2, 3],
		    [5, 6],
		    [6, 9]
		]
	});
});