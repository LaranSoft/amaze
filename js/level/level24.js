define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget', 'gadget/sealGadget'], function(Space, Maze, StartGadget, ExitGadget, TeleportGadget, SealGadget){

	return new Maze({
		size: [5, 4],
		spaces: [
			new Space(1, [1, 1], 'eeoioeee', [0, 2, 5, 0]),
			new Space(2, [1, 2], 'eeoioioe', [0, 3, 6, 1]),
			new Space(3, [1, 3], 'eeeeoioe', [0, 0, 7, 2]),
			new Space(4, [2, 0], 'eeoioeee', [0, 5, 8, 0]),
			new Space(5, [2, 1], 'oioioioe', [1, 6, 9, 4]),
			new Space(6, [2, 2], 'oioioioi', [2, 7, 10, 5]),
			new Space(7, [2, 3], 'oeeeoioi', [3, 0, 11, 6]),
			new Space(8, [3, 0], 'oioioeee', [4, 9, 12, 0]),
			new Space(9, [3, 1], 'oioioioi', [5, 10, 13, 8]),
			new Space(10, [3, 2], 'oioeoioi', [0, 11, 14, 9]),
			new Space(11, [3, 3], 'oeeeeeoi', [10, 0, 0, 10]),
			new Space(12, [4, 0], 'oioeeeee', [8, 13, 0, 0]),
			new Space(13, [4, 1], 'oioeeeoi', [9, 14, 0, 12]),
			new Space(14, [4, 2], 'oeeeeeoi', [10, 0, 0, 13])
		],
		gadgets: [
	        {gadget: new TeleportGadget(0, 1), position: [0, 1], fixed: false},
	        {gadget: new TeleportGadget(1, 1), position: [0, 2], fixed: false},
		    {gadget: new SealGadget(2), position: [1, 1], fixed: true},
		    {gadget: new SealGadget(3), position: [1, 3], fixed: true},
		    {gadget: new StartGadget(4), position: [2, 0], fixed: true},
		    {gadget: new SealGadget(5), position: [3, 3], fixed: true},
		    {gadget: new SealGadget(6), position: [4, 0], fixed: true},
		    {gadget: new ExitGadget(7), position: [4, 2], fixed: true}
		],
		obstacles: [
		    [6, 10]
		]
	});
});