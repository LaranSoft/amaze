define(['i18n!nls/messages', 'test/space', 'test/maze', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget', 'gadget/sealGadget'], function(messages, Space, Maze, Tutorial, StartGadget, ExitGadget, TeleportGadget, SealGadget){

	return new Maze({
		size: [4, 3],
		spaces: [
			new Space(1, [1, 0], 'eeoioeee', [0, 2, 4, 0]),
			new Space(2, [1, 1], 'eeoioioe', [0, 3, 5, 1]),
			new Space(3, [1, 2], 'eeeeoioe', [0, 0, 6, 2]),
			new Space(4, [2, 0], 'oioioeee', [1, 5, 7, 0]),
			new Space(5, [2, 1], 'oioioioi', [2, 6, 8, 4]),
			new Space(6, [2, 2], 'oeeeoioi', [3, 0, 9, 5]),
			new Space(7, [3, 0], 'oioeeeee', [4, 8, 0, 0]),
			new Space(8, [3, 1], 'oioeeeoi', [5, 9, 0, 7]),
			new Space(9, [3, 2], 'oeeeeeoi', [6, 0, 0, 8])
		],
		gadgets: [
	        {gadget: new TeleportGadget(0, 1), position: [0, 0], fixed: false},
	        {gadget: new TeleportGadget(1, 2), position: [0, 1], fixed: false},
		    {gadget: new TeleportGadget(2, 2), position: [0, 2], fixed: false},
		    {gadget: new ExitGadget(3), position: [1, 0], fixed: true},
		    {gadget: new StartGadget(4), position: [2, 0], fixed: true},
		    {gadget: new TeleportGadget(5, 1), position: [2, 2], fixed: true},
		    {gadget: new SealGadget(6), position: [3, 2], fixed: true}
		],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('22.0', [
				{height: 2, content: messages.tutorial2200, type: 'P'},
				{height: 5, content: messages.tutorial2201, type: 'P'}
			])}
		]
	});
});