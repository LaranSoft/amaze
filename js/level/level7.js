define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/sealGadget', 'gadget/forceDirectionGadget'], function(Space, Maze, StartGadget, ExitGadget, SealGadget, ForceDirectionGadget){

	return new Maze({
		size: [5, 4],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
		    new Space(2, [1, 1], 'eeoioioe', [0, 3, 6, 1]),
		    new Space(3, [1, 2], 'eeoioioe', [0, 4, 7, 2]),
		    new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
		    new Space(5, [2, 0], 'oioioeee', [1, 6, 9, 0]),
		    new Space(6, [2, 1], 'oioioioi', [2, 7, 10, 5]),
		    new Space(7, [2, 2], 'oioiiioi', [3, 8, 0, 6]),
		    new Space(8, [2, 3], 'oeeeoioi', [4, 0, 11, 7]),
		    new Space(9, [3, 0], 'oioioeee', [5, 10, 12, 0]),
		    new Space(10, [3, 1], 'oiiioioi', [6, 0, 13, 9]),
		    new Space(11, [3, 3], 'oeeeoiii', [8, 0, 15, 0]),
		    new Space(12, [4, 0], 'oioeeeee', [9, 13, 0, 0]),
		    new Space(13, [4, 1], 'oioeeeoi', [10, 14, 0, 12]),
		    new Space(14, [4, 2], 'iioeeeoi', [0, 15, 0, 13]),
		    new Space(15, [4, 3], 'oeeeeeoi', [11, 0, 0, 14])
		],
	    gadgets: [
	  	    {gadget: new ExitGadget(0), position: [0, 0], fixed: false},
	  	    {gadget: new SealGadget(1), position: [1, 3], fixed: true},
	  	    {gadget: new StartGadget(2), position: [3, 1], fixed: true},
	  	    {gadget: new SealGadget(3), position: [4, 0], fixed: true},
	  	    {gadget: new ForceDirectionGadget(4, 3), position: [4, 1], fixed: true},
	  	    {gadget: new SealGadget(5), position: [4, 2], fixed: true},
	  	]
	});
});