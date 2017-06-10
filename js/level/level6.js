define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'tutorial', 'gadget/startGadget', 'gadget/teleportGadget', 'gadget/exitGadget', 'gadget/sealGadget'], function(messages, Space, Maze, FileSystem, Tutorial, StartGadget, TeleportGadget, ExitGadget, SealGadget){

	return new Maze({
		size: [4, 3],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 4, 0]),
		    new Space(2, [1, 1], 'eeoioioe', [0, 3, 5, 1]),
		    new Space(3, [1, 2], 'eeeeoioe', [0, 0, 6, 2]),
		    new Space(4, [2, 0], 'oioioeee', [1, 5, 7, 0]),
		    new Space(5, [2, 1], 'oioiiioi', [2, 6, 0, 4]),
		    new Space(6, [2, 2], 'oeeeoioi', [3, 0, 9, 5]),
		    new Space(7, [3, 0], 'oioeeeee', [4, 8, 0, 0]),
		    new Space(8, [3, 1], 'iioeeeoi', [0, 9, 0, 7]),
		    new Space(9, [3, 2], 'oeeeeeoi', [8, 0, 0, 7])
		],
	    gadgets: [
	  	    {gadget: new TeleportGadget(0, 1), position: [0, 1], fixed: false},
	  	    {gadget: new StartGadget(1), position: [0, 0], fixed: false},
	  	    {gadget: new SealGadget(2), position: [2, 0], fixed: true},
	  	    {gadget: new TeleportGadget(3, 1), position: [2, 1], fixed: true},
	  	    {gadget: new SealGadget(4), position: [2, 2], fixed: true},
	  	    {gadget: new SealGadget(5), position: [3, 1], fixed: true},
	  	    {gadget: new ExitGadget(6), position: [3, 2], fixed: true}
	  	],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('6.0', [
				{height: 2, content: messages.gadget_Tunnel_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'teleport1_1.png', type: 'I'},
				{height: 3, content: messages.gadget_Tunnel_shortDescr_0, type: 'P'},
				{height: 3, content: messages.gadget_Tunnel_shortDescr_1, type: 'P'}
			])}
		]
	});
});