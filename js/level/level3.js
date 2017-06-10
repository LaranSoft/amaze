define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'tutorial', 'gadget/startGadget', 'gadget/forceDirectionGadget', 'gadget/exitGadget'], function(messages, Space, Maze, FileSystem, Tutorial, StartGadget, ForceDirectionGadget, ExitGadget){

    return new Maze({
    	size: [5, 4],
    	spaces: [
		    new Space(1, [1, 0], 'eeeeoeee', [0, 0, 5, 0]),
			new Space(3, [1, 2], 'eeoioeee', [0, 4, 7, 0]),
			new Space(4, [1, 3], 'eeeeoioe', [0, 0, 8, 3]),
			new Space(5, [2, 0], 'oeoioeee', [1, 6, 9, 0]),
			new Space(6, [2, 1], 'eeoioioe', [0, 7, 10, 5]),
			new Space(7, [2, 2], 'oioioioe', [3, 8, 11, 6]),
			new Space(8, [2, 3], 'oeeeoioi', [4, 0, 12, 7]),
			new Space(9, [3, 0], 'oioeeeee', [5, 10, 0, 0]),
			new Space(10, [3, 1], 'oioioeoi', [6, 11, 14, 9]),
		    new Space(11, [3, 2], 'oioeoioi', [7, 12, 15, 10]),
		    new Space(12, [3, 3], 'oeeeeeoi', [8, 0, 0, 11]),
		    new Space(14, [4, 1], 'oioeeeee', [10, 15, 0, 0]),
		    new Space(15, [4, 2], 'oeeeeeoi', [11, 0, 0, 14])
	    ],
	    gadgets: [
            {gadget: new ForceDirectionGadget(0, 2), position: [2, 1], fixed: true},
	        {gadget: new StartGadget(1), position: [0, 1], fixed: false},
	        {gadget: new ExitGadget(2), position: [0, 2], fixed: false}
	    ],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('3.0', [
				{height: 2, content: messages.gadget_ForcedDirection_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'forceDirection2.png', type: 'I'},
				{height: 3, content: messages.gadget_ForcedDirection_shortDescr_0, type: 'P'}
			])}
		]
    });
});         
