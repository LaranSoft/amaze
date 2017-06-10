define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/teleportGadget', 'gadget/teleportSwitchGadget'], function(messages, Space, Maze, FileSystem, Tutorial, StartGadget, ExitGadget, TeleportGadget, TeleportSwitchGadget){

	return new Maze({
		
		size: [5, 4],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 5, 0]),
		    new Space(2, [1, 1], 'eeoioioe', [0, 3, 6, 1]),
		    new Space(3, [1, 2], 'eeoioioe', [0, 4, 7, 2]),
		    new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
		    new Space(5, [2, 0], 'oioioeee', [1, 6, 9, 0]),
		    new Space(6, [2, 1], 'oioioioi', [2, 7, 10, 5]),
		    new Space(7, [2, 2], 'oioiiioi', [3, 8, 0, 6]),
		    new Space(8, [2, 3], 'oeeeoioi', [4, 0, 11, 7]),
		    new Space(9, [3, 0], 'oioioeee', [5, 10, 12, 0]),
		    new Space(10, [3, 1], 'oiiioioi', [6, 0, 13, 9]),
		    new Space(11, [3, 3], 'oeeeoiii', [8, 0, 15, 0]),
		    new Space(12, [4, 0], 'oioeeeee', [9, 13, 0, 0]),
		    new Space(13, [4, 1], 'oioeeeoi', [10, 14, 0, 12]),
		    new Space(14, [4, 2], 'iioeeeoi', [0, 15, 0, 13]),
		    new Space(15, [4, 3], 'oeeeeeoi', [11, 0, 0, 14])
		],
	    gadgets: [
	  	    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
	  	    {gadget: new TeleportGadget(1, 1, false), position: [1, 3], fixed: true},
	  	    {gadget: new TeleportGadget(2, 1, false), position: [2, 0], fixed: true},
	  	    {gadget: new TeleportSwitchGadget(3, 1), position: [2, 1], fixed: true},
	  	    {gadget: new ExitGadget(4), position: [3, 0], fixed: true}
	  	],
		tutorials: [
			{showOn: 'startPhase1', tutorial: new Tutorial('11.0', [
				{height: 2, content: messages.gadget_MoleTunnel_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'teleport1_0.png', type: 'I'},
				{height: 3, content: messages.gadget_MoleTunnel_shortDescr, type: 'P'},
			])},
		    {showOn: 'startPhase1', tutorial: new Tutorial('11.1', [
				{height: 2, content: messages.gadget_Hammer_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'teleportSwitch1.png', type: 'I'},
				{height: 3, content: messages.gadget_Hammer_shortDescr_0, type: 'P'},
				{height: 3, content: messages.gadget_Hammer_shortDescr_1, type: 'P'}
			])}
		]
	});
});