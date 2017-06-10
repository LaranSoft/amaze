define(['test/space', 'test/maze', 'gadget/startGadget', 'gadget/sealGadget', 'gadget/exitGadget'], function(Space, Maze, StartGadget, SealGadget, ExitGadget){
	return new Maze({
		size: [4, 3],
		spaces: [ 
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 4, 0]),
		    new Space(2, [1, 1], 'eeoiiioe', [0, 3, 0, 1]),
		    new Space(3, [1, 2], 'eeeeoioe', [0, 0, 6, 2]),
		    new Space(4, [2, 0], 'oioioeee', [1, 5, 7, 0]),
		    new Space(5, [2, 1], 'iioeoioi', [0, 6, 8, 4]),
		    new Space(6, [2, 2], 'oeeeeeoi', [3, 0, 0, 5]),
		    new Space(7, [3, 0], 'oioeeeee', [4, 8, 0, 0]),
		    new Space(8, [3, 1], 'oeeeeeoi', [5, 0, 0, 7])
		],
		gadgets: [
		    {gadget: new ExitGadget(0), position: [0, 1], fixed: false},
		    {gadget: new StartGadget(1), position: [1, 2], fixed: true},
		    {gadget: new SealGadget(2), position: [2, 2], fixed: true},
		    {gadget: new SealGadget(3), position: [2, 2], fixed: true}
		]
	});
});		
