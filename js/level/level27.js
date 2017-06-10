define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget'], function(Space, Maze, StartGadget, ExitGadget){

	return new Maze({
		size: [5, 4],
		spaces: [
			new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
			new Space(2, [1, 1], 'eeoiiioe', [0, 3, 0, 1]),
			new Space(3, [1, 2], 'eeoioioe', [0, 4, 7, 2]),
			new Space(4, [1, 3], 'eeeeoioe', [0, 0, 0, 3]),
			new Space(5, [2, 0], 'oiiioeee', [1, 0, 9, 0]),
			new Space(7, [2, 2], 'oioioiii', [3, 8, 11, 0]),
			new Space(8, [2, 3], 'oeeeoioi', [4, 0, 12, 7]),
			new Space(9, [3, 0], 'oioioeee', [5, 10, 13, 0]),
			new Space(10, [3, 1], 'iioioioi', [0, 11, 14, 9]),
			new Space(11, [3, 2], 'oioioioi', [0, 12, 15, 10]),
			new Space(12, [3, 3], 'oeeeoioi', [8, 0, 16, 11]),
			new Space(13, [4, 0], 'oioeeeee', [9, 14, 0, 0]),
			new Space(14, [4, 1], 'oioeeeoi', [10, 15, 0, 0]),
			new Space(15, [4, 2], 'oioeeeoi', [11, 16, 0, 14]),
			new Space(16, [4, 3], 'oeeeeeoi', [0, 0, 0, 15])
		],
		gadgets: [
		    {gadget: new StartGadget(0), position: [0, 1], fixed: false},
            {gadget: new ExitGadget(1), position: [0, 2], fixed: false}
		],
		obstacles: [
		    [8, 4],
		    [7, 11],
		    [13, 14],
		    [12, 16]
		]
	});
});