define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/lifeGadget', 'gadget/forceDirectionGadget', 'gadget/bowTrapGadget'], function(Space, Maze, StartGadget, ExitGadget, LifeGadget, ForceDirectionGadget, BowTrapGadget){

	return new Maze({
		size: [5, 5],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 6, 0]),
			new Space(2, [1, 1], 'eeoiiioe', [0, 3, 0, 1]),
			new Space(3, [1, 2], 'eeoioioe', [0, 4, 8, 2]),
			new Space(4, [1, 3], 'eeoiiioe', [0, 5, 0, 3]),
			new Space(5, [1, 4], 'eeeeoioe', [0, 0, 10, 4]),
			new Space(6, [2, 0], 'oioioeee', [1, 7, 11, 0]),
			new Space(7, [2, 1], 'iioiiioi', [0, 8, 0, 6]),
			new Space(8, [2, 2], 'oiiioioi', [3, 0, 13, 7]),
			new Space(10, [2, 4], 'oeeeoiii', [5, 0, 15, 0]),
		    new Space(11, [3, 0], 'oiiioeee', [6, 0, 16, 0]),
		    new Space(13, [3, 2], 'oioioiii', [8, 14, 18, 0]),
		    new Space(14, [3, 3], 'iioioioi', [0, 15, 19, 13]),
		    new Space(15, [3, 4], 'oeeeoioi', [10, 0, 20, 14]),
		    new Space(16, [4, 0], 'oioeeeee', [11, 17, 0, 0]),
		    new Space(17, [4, 1], 'iioeeeoi', [0, 18, 0, 16]),
		    new Space(18, [4, 2], 'oioeeeoi', [13, 19, 0, 17]),
		    new Space(19, [4, 3], 'oioeeeoi', [14, 20, 0, 18]),
		    new Space(20, [4, 4], 'oeeeeeoi', [15, 0, 0, 19])
		],
	    gadgets: [
	        {gadget: new StartGadget(0), position: [0, 1], fixed: false},
	        {gadget: new ExitGadget(1), position: [0, 2], fixed: false},
	        {gadget: new BowTrapGadget(2), position: [0, 3], fixed: false},
	        {gadget: new LifeGadget(3), position: [1, 2], fixed: true},
	        {gadget: new ForceDirectionGadget(4, 3), position: [3, 4], fixed: true},
	        {gadget: new BowTrapGadget(5), position: [4, 2], fixed: true},
	        {gadget: new LifeGadget(6), position: [4, 3], fixed: true}
	  	]
	});
});