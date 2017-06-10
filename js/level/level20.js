define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget'], function(Space, Maze, StartGadget, ExitGadget, TeleportGadget){

	return new Maze({
		size: [6, 6],
		spaces: [
		    new Space(1, [0, 4], 'eeoioeee', [0, 2, 4, 0]),
			new Space(2, [0, 5], 'eeeeoioe', [0, 0, 5, 1]),
			new Space(3, [1, 3], 'eeoioeee', [0, 4, 7, 0]),
			new Space(4, [1, 4], 'oioiiioe', [1, 5, 0, 3]),
			new Space(5, [1, 5], 'oeeeoioi', [2, 0, 8, 4]),
			new Space(6, [2, 2], 'eeoioeee', [0, 7, 11, 0]),
			new Space(7, [2, 3], 'oiiioioe', [3, 0, 12, 6]),
			new Space(8, [2, 5], 'oeeeoiii', [5, 0, 14, 0]),
			new Space(9, [3, 0], 'eeoioeee', [0, 10, 15, 0]),
		    new Space(10, [3, 1], 'eeoioioe', [0, 11, 16, 10]),
		    new Space(11, [3, 2], 'oioiiioe', [6, 12, 0, 10]),
		    new Space(12, [3, 3], 'oioioioi', [7, 13, 17, 11]),
		    new Space(13, [3, 4], 'iioioioi', [0, 14, 18, 12]),
		    new Space(14, [3, 5], 'oeeeoioi', [8, 0, 19, 13]),
		    new Space(15, [4, 0], 'oioeeeee', [9, 16, 0, 0]),
		    new Space(16, [4, 1], 'oiiioeoi', [10, 0, 20, 15]),
		    new Space(17, [4, 3], 'oioioiii', [12, 18, 22, 0]),
		    new Space(18, [4, 4], 'oioioioi', [13, 19, 25, 17]),
		    new Space(19, [4, 5], 'oeeeoioi', [0, 0, 24, 18]),
		    new Space(20, [5, 1], 'oioeeeee', [16, 21, 0, 0]),
		    new Space(21, [5, 2], 'iioeeeoi', [0, 22, 0, 20]),
		    new Space(22, [5, 3], 'oioeeeoi', [0, 23, 0, 21]),
		    new Space(23, [5, 4], 'oioeeeoi', [18, 24, 0, 22]),
		    new Space(24, [5, 5], 'oeeeeeoi', [19, 0, 0, 23])
		],
	    gadgets: [
            {gadget: new TeleportGadget(0, 1), position: [0, 0], fixed: false},
	        {gadget: new StartGadget(1), position: [5, 2], fixed: true},
	        {gadget: new TeleportGadget(2, 1), position: [4, 4], fixed: true},
	        {gadget: new ExitGadget(3), position: [3, 0], fixed: true}
	  	],
	  	obstacles: [
	  	    [17, 22],
	  	    [14, 19]
	  	]
	});
});