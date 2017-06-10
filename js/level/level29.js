define(['i18n!nls/messages', 'test/space', 'test/maze', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/lifeGadget', 'gadget/bowTrapGadget', 'gadget/sealGadget'], function(messages, Space, Maze, Tutorial, StartGadget, ExitGadget, LifeGadget, BowTrapGadget, SealGadget){

	return new Maze({
		isLast: true,
		size: [7, 4],
		spaces: [
			new Space(1, [3, 0], 'eeoioeee', [0, 2, 5, 0]),
		  	new Space(2, [3, 1], 'eeoioioe', [0, 3, 6, 0]),
		  	new Space(3, [3, 2], 'eeoioioe', [0, 4, 7, 2]),
		  	new Space(4, [3, 3], 'eeeeoioe', [0, 0, 8, 3]),
		  	new Space(5, [4, 0], 'oioioeee', [1, 6, 9, 0]),
		  	new Space(6, [4, 1], 'oioioioi', [2, 7, 10, 5]),
		  	new Space(7, [4, 2], 'oioioioi', [3, 8, 11, 6]),
		  	new Space(8, [4, 3], 'oeeeoioi', [4, 0, 12, 7]),
		  	new Space(9, [5, 0], 'oioioeee', [5, 10, 13, 0]),
		  	new Space(10, [5, 1], 'oioioioi', [6, 11, 14, 9]),
		  	new Space(11, [5, 2], 'oioioioi', [7, 12, 15, 10]),
		  	new Space(12, [5, 3], 'oeeeoioi', [8, 0, 16, 11]),
		  	new Space(13, [6, 0], 'oioeeeee', [9, 14, 0, 0]),
		  	new Space(14, [6, 1], 'oioeeeoi', [10, 15, 0, 13]),
		  	new Space(15, [6, 2], 'oioeeeoi', [0, 16, 0, 14]),
		  	new Space(16, [6, 3], 'oeeeeeoi', [12, 0, 0, 15])
		],
		gadgets: [
		    {gadget: new StartGadget(0), position: [0, 1], fixed: false},
            {gadget: new ExitGadget(1), position: [0, 2], fixed: false},
            {gadget: new BowTrapGadget(2), position: [1, 0], fixed: false},
            {gadget: new BowTrapGadget(3), position: [1, 1], fixed: false},
            {gadget: new BowTrapGadget(4), position: [1, 2], fixed: false},
            {gadget: new BowTrapGadget(5), position: [1, 3], fixed: false},
            {gadget: new LifeGadget(6), position: [2, 0], fixed: false},
            {gadget: new LifeGadget(7), position: [2, 1], fixed: false},
            {gadget: new LifeGadget(8), position: [2, 2], fixed: false},
            {gadget: new LifeGadget(9), position: [2, 3], fixed: false},
            {gadget: new SealGadget(10), position: [3, 1], fixed: true},
            {gadget: new SealGadget(11), position: [4, 0], fixed: true},
            {gadget: new SealGadget(12), position: [4, 2], fixed: true},
            {gadget: new SealGadget(13), position: [5, 1], fixed: true},
            {gadget: new SealGadget(14), position: [5, 3], fixed: true},
            {gadget: new SealGadget(15), position: [6, 2], fixed: true}
		],
		obstacles: [
		    [1, 2],
		    [11, 15]
		],
		tutorials: [
			{showOn: 'worldCompleted', tutorial: new Tutorial('29.0', [
				{height: 1, content: messages.tutorial_29_0_0, type: 'P'}
			])},
			{showOn: 'worldCompleted', tutorial: new Tutorial('29.1', [
				{height: 1, content: messages.tutorial_29_0_1, type: 'P'}
			])},
			{showOn: 'worldCompleted', tutorial: new Tutorial('29.2', [
				{height: 1, content: messages.tutorial_29_0_2, type: 'P'}
			])}
		]
		
	});
});