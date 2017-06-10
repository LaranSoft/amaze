define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'tutorial', 'gadget/startGadget', 'gadget/exitGadget', 'gadget/lifeGadget', 'gadget/damageGadget', 'gadget/forceDirectionGadget'], function(messages, Space, Maze, FileSystem, Tutorial, StartGadget, ExitGadget, LifeGadget, DamageGadget, ForceDirectionGadget){

	return new Maze({
		size: [5, 4],
		spaces: [
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 4, 0]),
			new Space(2, [1, 1], 'eeoioioe', [0, 3, 5, 1]),
			new Space(3, [1, 2], 'eeeeoioe', [0, 0, 6, 2]),
			new Space(4, [2, 0], 'oioioeee', [1, 5, 8, 0]),
			new Space(5, [2, 1], 'oioioioi', [2, 6, 9, 4]),
			new Space(6, [2, 2], 'oeoioioi', [3, 7, 10, 5]),
			new Space(7, [2, 3], 'eeeeoioe', [0, 0, 11, 6]),
			new Space(8, [3, 0], 'oioeeeee', [4, 9, 0, 0]),
			new Space(9, [3, 1], 'oioioeoi', [5, 10, 12, 8]),
			new Space(10, [3, 2], 'oioeoioi', [6, 11, 13, 9]),
		    new Space(11, [3, 3], 'oeeeeeoi', [7, 0, 0, 10]),
		    new Space(12, [4, 1], 'oioeeeee', [9, 13, 0, 0]),
		    new Space(13, [4, 2], 'oeeeeeoi', [10, 0, 0, 12])
		],
	    gadgets: [
	  	    {gadget: new StartGadget(0), position: [0, 0], fixed: false},
	  	    {gadget: new ExitGadget(1), position: [0, 1], fixed: false},
	  	    {gadget: new DamageGadget(2), position: [1, 0], fixed: true},
	  	    {gadget: new LifeGadget(3), position: [2, 1], fixed: true},
	  	    {gadget: new ForceDirectionGadget(4, 0), position: [3, 0], fixed: true}
	  	],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('10.0', [
				{height: 2, content: messages.gadget_LifePoint_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'life.png', type: 'I'},
				{height: 3, content: messages.gadget_LifePoint_shortDescr, type: 'P'}
			])},
			{showOn: 'startPhase1', tutorial: new Tutorial('10.1', [
				{height: 2, content: messages.gadget_Tagliola_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'damage.png', type: 'I'},
				{height: 3, content: messages.gadget_Tagliola_shortDescr_0, type: 'P'},
				{height: 3, content: messages.gadget_Tagliola_shortDescr_1, type: 'P'}
			])}
		]
	});
});