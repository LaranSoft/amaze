define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/sealGadget', 'gadget/keyGadget'], function(messages, Space, Maze, FileSystem, Tutorial, StartGadget, ExitGadget, SealGadget, KeyGadget){

	return new Maze({
		
		size: [5, 3],
		spaces: [
		    new Space(1, [0, 2], 'eeeeoeee', [0, 0, 4, 0]),
		    new Space(2, [1, 0], 'eeoioeee', [0, 3, 5, 0]),
		    new Space(3, [1, 1], 'eeoioioe', [0, 4, 6, 2]),
		    new Space(4, [1, 2], 'oeeeoioe', [1, 0, 7, 3]),
		    new Space(5, [2, 0], 'oioioeee', [2, 6, 8, 0]),
		    new Space(6, [2, 1], 'oioioioi', [3, 7, 9, 5]),
		    new Space(7, [2, 2], 'oeeeoioi', [4, 0, 10, 6]),
		    new Space(8, [3, 0], 'oioioeee', [5, 9, 11, 0]),
		    new Space(9, [3, 1], 'oioioioi', [6, 10, 12, 8]),
		    new Space(10, [3, 2], 'oeeeoioi', [7, 0, 13, 9]),
		    new Space(11, [4, 0], 'oioeeeee', [8, 12, 0, 0]),
		    new Space(12, [4, 1], 'oioeeeoi', [9, 13, 0, 11]),
		    new Space(13, [4, 2], 'oeeeeeoi', [10, 0, 0, 12])
		],
		doors: [
		    [5, 6],
		    [6, 9]
		],
	    gadgets: [
	  	    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
	  	    {gadget: new ExitGadget(1), position: [0, 2], fixed: true},
	  	    {gadget: new SealGadget(2), position: [3, 1], fixed: true},
	  	    {gadget: new KeyGadget(3), position: [3, 2], fixed: true},
	  	    {gadget: new SealGadget(4), position: [4, 0], fixed: true},
	  	    {gadget: new SealGadget(5), position: [4, 2], fixed: true}
	  	],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('8.0', [
				{height: 2, content: messages.gadget_Chiave_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'key.png', type: 'I'},
				{height: 3, content: messages.gadget_Chiave_shortDescr_0, type: 'P'},
				{height: 3, content: messages.gadget_Chiave_shortDescr_1, type: 'P'}
			])},
			{showOn: 'startPhase1', tutorial: new Tutorial('8.1', [
				{height: 2, content: messages.gadget_Door_name, type: 'P'},
				{height: 3, src: 'doorV.png', type: 'I'},
				{height: 3, content: messages.gadget_Door_shortDescr_0, type: 'P'},
				{height: 3, content: messages.gadget_Door_shortDescr_1, type: 'P'}
			])}
		]
	});
});