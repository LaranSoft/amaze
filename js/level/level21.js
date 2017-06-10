define(['i18n!nls/messages', 'test/space', 'test/maze', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/lifeGadget', 'gadget/keyGadget', 'gadget/bowTrapGadget', 'gadget/sealGadget'], function(messages, Space, Maze, Tutorial, StartGadget, ExitGadget, LifeGadget, KeyGadget, BowTrapGadget, SealGadget){

	return new Maze({
		size: [6, 4],
		spaces: [
			new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
			new Space(2, [1, 1], 'eeoioioe', [0, 3, 6, 1]),
			new Space(3, [1, 2], 'eeoiiioe', [0, 4, 0, 2]),
			new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
			new Space(5, [2, 0], 'oioioeee', [1, 6, 9, 0]),
			new Space(6, [2, 1], 'oiiioioi', [2, 0, 10, 5]),
			new Space(8, [2, 3], 'oeeeoiii', [4, 0, 12, 0]),
			new Space(9, [3, 0], 'oioioeee', [5, 10, 13, 0]),
			new Space(10, [3, 1], 'oioiiioi', [0, 11, 0, 9]),
			new Space(11, [3, 2], 'iioioioi', [0, 12, 15, 10]),
			new Space(12, [3, 3], 'oeeeoioi', [8, 0, 16, 11]),
			new Space(13, [4, 0], 'oiiioeee', [9, 0, 17, 0]),
			new Space(15, [4, 2], 'oioioiii', [11, 16, 19, 0]),
			new Space(16, [4, 3], 'oeeeoioi', [12, 0, 20, 15]),
			new Space(17, [5, 0], 'oioeeeee', [13, 18, 0, 0]),
			new Space(18, [5, 1], 'iioeeeoi', [0, 0, 0, 17]),
			new Space(19, [5, 2], 'oioeeeoi', [15, 20, 0, 18]),
			new Space(20, [5, 3], 'oeeeeeoi', [16, 0, 0, 19])
		],
		gadgets: [
	        {gadget: new ExitGadget(0), position: [0, 0], fixed: false},
	        {gadget: new LifeGadget(1), position: [0, 1], fixed: false},
		    {gadget: new StartGadget(2), position: [0, 2], fixed: false},
		    {gadget: new KeyGadget(3), position: [1, 0], fixed: true},
		    {gadget: new BowTrapGadget(4), position: [1, 3], fixed: true},
		    {gadget: new SealGadget(5), position: [4, 0], fixed: true},
		    {gadget: new SealGadget(6), position: [5, 1], fixed: true}
		],
		doors: [
			[10, 11],
			[13, 17]
		],
		obstacles: [
		    [6, 10],
		    [19, 18]
		],
		credits: messages.credits + ' Alessio'
	});
});