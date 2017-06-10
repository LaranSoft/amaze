define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget', 'gadget/teleportSwitchGadget', 'gadget/lifeGadget', 'gadget/damageGadget', 'gadget/sealGadget'], function(Space, Maze, StartGadget, ExitGadget, TeleportGadget, TeleportSwitchGadget, LifeGadget, DamageGadget, SealGadget){

	return new Maze({
		
		size: [5, 3],
		spaces: [
		    new Space(1, [2, 0], 'eeoioeee', [0, 2, 4, 0]),
			new Space(2, [2, 1], 'eeoioioe', [0, 3, 5, 1]),
			new Space(3, [2, 2], 'eeeeoioe', [0, 0, 6, 2]),
			new Space(4, [3, 0], 'oioioeee', [1, 5, 7, 0]),
			new Space(5, [3, 1], 'oioioioi', [2, 6, 8, 4]),
			new Space(6, [3, 2], 'oeeeoioi', [3, 0, 9, 5]),
			new Space(7, [4, 0], 'oioeeeee', [4, 8, 0, 0]),
			new Space(8, [4, 1], 'oioeeeoi', [5, 9, 0, 7]),
			new Space(9, [4, 2], 'oeeeeeoi', [6, 0, 0, 8])
		],
	    gadgets: [
	  	    {gadget: new TeleportGadget(0, 1, false), position: [1, 0], fixed: false},
	  	    {gadget: new TeleportSwitchGadget(1, 1), position: [1, 1], fixed: false},
	  	    {gadget: new LifeGadget(2), position: [1, 2], fixed: false},
	  	    {gadget: new ExitGadget(3), position: [0, 1], fixed: false},
	  	    {gadget: new DamageGadget(4), position: [2, 0], fixed: true},
	  	    {gadget: new TeleportGadget(5, 1, false), position: [2, 2], fixed: true},
	  	    {gadget: new SealGadget(6), position: [3, 0], fixed: true},
	  	    {gadget: new SealGadget(7), position: [3, 1], fixed: true},
	  	    {gadget: new StartGadget(8), position: [4, 1], fixed: true}
	  	]
		
	});
});