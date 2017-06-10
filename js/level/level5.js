define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/forceDirectionGadget', 'gadget/exitGadget', 'gadget/sealGadget'], function(Space, Maze, StartGadget, ForceDirectionGadget, ExitGadget, SealGadget){

	return new Maze({
		size: [4, 4],
		spaces: [
			new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
			new Space(2, [1, 1], 'eeoioioe', [0, 3, 6, 1]),
			new Space(3, [1, 2], 'eeoioioe', [0, 4, 7, 2]),
			new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
			new Space(5, [2, 0], 'oioioeee', [1, 6, 9, 0]),
			new Space(6, [2, 1], 'oioioioi', [2, 7, 10, 5]),
			new Space(7, [2, 2], 'oioeoioi', [3, 8, 11, 6]),
			new Space(8, [2, 3], 'oeeeeeoi', [4, 0, 0, 7]),
			new Space(9, [3, 0], 'oioeeeee', [5, 10, 0, 0]),
			new Space(10, [3, 1], 'oioeeeoi', [6, 11, 0, 9]),
			new Space(11, [3, 2], 'oeeeeeoi', [7, 0, 0, 10])
		],
	    gadgets: [
	  	    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
	  	    {gadget: new ExitGadget(1), position: [0, 1], fixed: false},
	  	    {gadget: new SealGadget(2), position: [1, 0], fixed: true},
	  	    {gadget: new ForceDirectionGadget(3, 1), position: [2, 1], fixed: true},
	  	    {gadget: new SealGadget(4), position: [3, 2], fixed: true}
	  	]
	});
});