define(['i18n!nls/messages', 'test/space', 'test/maze', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/sealGadget', 'gadget/keyGadget', 'gadget/lifeGadget', 'gadget/damageGadget'], function(messages, Space, Maze, Tutorial, StartGadget, ExitGadget, SealGadget, KeyGadget, LifeGadget, DamageGadget){

	return new Maze({
		
		size: [5, 4],
		spaces: [
			new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
			new Space(2, [1, 1], 'eeoioioe', [0, 3, 6, 1]),
			new Space(3, [1, 2], 'eeoioioe', [0, 4, 7, 2]),
			new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
			new Space(5, [2, 0], 'oioioeee', [1, 6, 9, 0]),
			new Space(6, [2, 1], 'oioioioi', [2, 7, 10, 5]),
			new Space(7, [2, 2], 'oioioioi', [3, 8, 11, 6]),
			new Space(8, [2, 3], 'oeeeoioi', [4, 0, 12, 7]),
			new Space(9, [3, 0], 'oioioeee', [5, 10, 13, 0]),
			new Space(10, [3, 1], 'oioioioi', [6, 11, 14, 9]),
			new Space(11, [3, 2], 'oioioioi', [7, 12, 15, 10]),
			new Space(12, [3, 3], 'oeeeoioi', [8, 0, 16, 11]),
			new Space(13, [4, 0], 'oioeeeee', [9, 14, 0, 0]),
			new Space(14, [4, 1], 'oioeeeoi', [10, 15, 0, 13]),
			new Space(15, [4, 2], 'oioeeeoi', [11, 16, 0, 14]),
			new Space(16, [4, 3], 'oeeeeeoi', [12, 0, 0, 15])
		],
		doors: [
		    [3, 4]
		],
	    gadgets: [
	  	    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
	  	    {gadget: new ExitGadget(1), position: [0, 1], fixed: false},
	  	    {gadget: new LifeGadget(2), position: [1, 2], fixed: true},
	  	    {gadget: new KeyGadget(3), position: [1, 3], fixed: true},
	  	    {gadget: new SealGadget(4), position: [2, 2], fixed: true},
	  	    {gadget: new LifeGadget(5), position: [3, 1], fixed: true},
	  	    {gadget: new SealGadget(6), position: [3, 3], fixed: true},
	  	    {gadget: new DamageGadget(7), position: [4, 0], fixed: true},
	  	    {gadget: new SealGadget(8), position: [4, 2], fixed: true},
	  	    {gadget: new DamageGadget(9), position: [4, 3], fixed: true}
	  	],
		credits: messages.credits + ' Alessio'
	});
});