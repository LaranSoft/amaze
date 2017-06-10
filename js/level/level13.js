define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget', 'gadget/bowTrapGadget', 'gadget/lifeGadget'], function(messages, Space, Maze, FileSystem, Tutorial, StartGadget, ExitGadget, TeleportGadget, BowTrapGadget, LifeGadget){

	return new Maze({
		
		size: [6, 5],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 6, 0], {free: false, gadget: new LifeGadget(1)}),
			new Space(2, [1, 1], 'eeoioioe',  [0, 3, 7, 1]),
			new Space(3, [1, 2], 'eeoiiioe',  [0, 4, 0, 2]),
			new Space(4, [1, 3], 'eeoioioe',  [0, 5, 8, 3]),
			new Space(5, [1, 4], 'eeeeoioe',  [0, 0, 9, 4]),
			new Space(6, [2, 0], 'oioioeee',  [1, 7, 10, 0]),
			new Space(7, [2, 1], 'oiiioioi',  [2, 0, 11, 6]),
			new Space(8, [2, 3], 'oioioiii',  [4, 9, 13, 0]),
			new Space(9, [2, 4], 'oeeeoioi',  [5, 0, 14, 8], {free: false, gadget: new LifeGadget(1)}),
			new Space(10, [3, 0], 'oioioeee',  [6, 11, 15, 0]),
			new Space(11, [3, 1], 'oioioioi',  [7, 12, 16, 10], {free: false, gadget: new BowTrapGadget()}),
			new Space(12, [3, 2], 'iioeoioi',  [0, 13, 17, 11]),
			new Space(13, [3, 3], 'oioeeeoi',  [8, 14, 0, 12]),
			new Space(14, [3, 4], 'oeeeoeoi',  [9, 0, 18, 13]),
			new Space(15, [4, 0], 'oioioeee',  [10, 16, 19, 0]),
			new Space(16, [4, 1], 'oioioioi',  [11, 17, 20, 15], {free: false, gadget: new ExitGadget()}),
			new Space(17, [4, 2], 'oeeeoioi',  [12, 0, 21, 16]),
			new Space(18, [4, 4], 'oeeeoeee',  [14, 0, 22, 0]),
			new Space(19, [5, 0], 'oioeeeee',  [15, 20, 0, 0]),
			new Space(20, [5, 1], 'oioeeeoi',  [16, 21, 0, 19], {free: false, gadget: new BowTrapGadget()}),
			new Space(21, [5, 2], 'oeeeeeoi',  [17, 0, 0, 20]),
			new Space(22, [5, 4], 'oeeeeeee',  [18, 0, 0, 0])
		],
	    gadgets: [
	  	    {gadget: new TeleportGadget(0, 1), position: [0, 0], fixed: false},
	  	    {gadget: new TeleportGadget(1, 1), position: [0, 1], fixed: false},
	  	    {gadget: new StartGadget(2), position: [0, 2], fixed: false},
	  	    {gadget: new LifeGadget(3), position: [1, 0], fixed: true},
	  	    {gadget: new LifeGadget(4), position: [2, 4], fixed: true},
	  	    {gadget: new BowTrapGadget(5), position: [3, 1], fixed: true},
	  	    {gadget: new ExitGadget(6), position: [4, 1], fixed: true},
	  	    {gadget: new BowTrapGadget(7), position: [5, 1], fixed: true}
	  	],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('13.0', [
				{height: 2, content: messages.gadget_BowTrap_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'bowTrap.png', type: 'I'},
				{height: 4, content: messages.gadget_BowTrap_shortDescr_0, type: 'P'},
				{height: 3, content: messages.gadget_BowTrap_shortDescr_1, type: 'P'}
			])}
		]
	});
});