define(['i18n!nls/messages', 'test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/lifeGadget', 'gadget/teleportGadget', 'gadget/sealGadget', 'gadget/damageGadget'], function(messages, Space, Maze, StartGadget, ExitGadget, LifeGadget, TeleportGadget, SealGadget, DamageGadget){

	return new Maze({
		size: [6, 4],
		spaces: [
			new Space(2, [2, 1], 'eeoeeeee', [0, 3, 0, 0]), // 0120
		  	new Space(3, [2, 2], 'eeoioeoe', [0, 4, 7, 2]),
		  	new Space(4, [2, 3], 'eeeeoioe', [0, 0, 0, 3]),
		  	new Space(5, [3, 0], 'eeeeoeee', [0, 0, 9, 0]), // 2210
		  	new Space(7, [3, 2], 'oioeeeee', [3, 8, 0, 0]), // 1122
		  	new Space(8, [3, 3], 'oeeeoeoi', [4, 0, 12, 7]),
		  	new Space(9, [4, 0], 'oeoioeee', [5, 10, 13, 0]),
		  	new Space(10, [4, 1], 'eeeeoioe', [0, 0, 14, 9]), //2211
		  	new Space(12, [4, 3], 'oeeeoeee', [8, 0, 16, 0]),
		  	new Space(13, [5, 0], 'oioeeeee', [9, 14, 0, 0]),
		  	new Space(14, [5, 1], 'oeoeeeoi', [10, 15, 0, 0]),
		  	new Space(15, [5, 2], 'eeoeeeoe', [0, 16, 0, 14]),
		  	new Space(16, [5, 3], 'oeeeeeoe', [12, 0, 0, 15])
		],
		gadgets: [
		    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
            {gadget: new ExitGadget(1), position: [0, 1], fixed: false},
            {gadget: new LifeGadget(2), position: [1, 0], fixed: false},
            {gadget: new TeleportGadget(3, 1), position: [1, 1], fixed: false},
            {gadget: new TeleportGadget(4, 2), position: [1, 2], fixed: false},
            {gadget: new TeleportGadget(5, 1), position: [3, 0], fixed: true},
            {gadget: new SealGadget(6), position: [3, 2], fixed: true},
            {gadget: new SealGadget(7), position: [4, 1], fixed: true},
            {gadget: new DamageGadget(8), position: [5, 1], fixed: true},
            {gadget: new TeleportGadget(9, 2), position: [5, 2], fixed: true}
		],
		obstacles: [
		    [8, 4],
		    [13, 14]
		],
		credits: messages.credits + ' Alessio'
	});
});