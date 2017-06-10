define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/forceDirectionGadget'], function(Space, Maze, StartGadget, ExitGadget, ForceDirectionGadget){

	return new Maze({
		size: [6, 3],
		spaces: [
			new Space(1, [2, 0], 'eeoioeee', [0, 2, 4, 0]),
		    new Space(2, [2, 1], 'eeoioioe', [0, 3, 5, 1]),
		    new Space(3, [2, 2], 'eeeeoioe', [0, 0, 6, 2]),
		    new Space(4, [3, 0], 'oioioeee', [1, 5, 7, 0]),
		    new Space(5, [3, 1], 'oioioioi', [2, 6, 8, 4]),
		    new Space(6, [3, 2], 'oeeeoioi', [3, 0, 9, 5]),
		    new Space(7, [4, 0], 'oioeeeee', [4, 8, 0, 0]),
		    new Space(8, [4, 1], 'oioeeeoi', [5, 9, 0, 7]),
		    new Space(9, [4, 2], 'oeeeeeoi', [6, 0, 0, 0])
		],
		gadgets: [
		    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
            {gadget: new ExitGadget(1), position: [0, 1], fixed: false},
	        {gadget: new ForceDirectionGadget(2, 1), position: [0, 2], fixed: false},
	        {gadget: new ForceDirectionGadget(3, 3), position: [1, 0], fixed: false},
	        {gadget: new ForceDirectionGadget(4, 3), position: [1, 1], fixed: false},
	        {gadget: new ForceDirectionGadget(5, 3), position: [1, 2], fixed: false}
		],
		obstacles: [
		    [8, 9]
		]
	});
});