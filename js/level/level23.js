define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget', 'gadget/sealGadget', 'gadget/lifeGadget', 'gadget/bowTrapGadget'], function(Space, Maze, StartGadget, ExitGadget, TeleportGadget, SealGadget, LifeGadget, BowTrapGadget){

	return new Maze({
		size: [4, 4],
		spaces: [
			new Space(1, [0, 0], 'eeeeoeee', [0, 0, 2, 0]),
			new Space(2, [1, 0], 'oeoioeee', [1, 3, 4, 0]),
			new Space(3, [1, 1], 'eeeeoioe', [0, 0, 5, 2]),
			new Space(4, [2, 0], 'oioioeee', [2, 5, 7, 0]),
			new Space(5, [2, 1], 'oeoioioi', [3, 6, 8, 4]),
			new Space(6, [2, 2], 'eeeeoioe', [0, 0, 9, 5]),
			new Space(7, [3, 0], 'oioeeeee', [4, 8, 0, 0]),
			new Space(8, [3, 1], 'oioeeeoi', [5, 9, 0, 7]),
			new Space(9, [3, 2], 'oeoeeeoi', [6, 10, 0, 8]),
			new Space(10, [3, 3], 'eeeeeeoe', [0, 0, 0, 9])
		],
		gadgets: [
	        {gadget: new StartGadget(0), position: [0, 2], fixed: false},
		    {gadget: new TeleportGadget(1, 1), position: [0, 3], fixed: false},
		    {gadget: new LifeGadget(2), position: [1, 3], fixed: false},
		    {gadget: new ExitGadget(3), position: [0, 0], fixed: true},
		    {gadget: new TeleportGadget(4, 1), position: [2, 0], fixed: true},
		    {gadget: new BowTrapGadget(5), position: [3, 0], fixed: true}
		]
	});
});