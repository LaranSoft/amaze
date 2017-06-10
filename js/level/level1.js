define(['i18n!nls/messages', 'test/space', 'test/maze', 'fileSystem', 'mazeEvent', 'tutorial', 'gadget/startGadget', 'gadget/sealGadget', 'gadget/exitGadget'], function(messages, Space, Maze, FileSystem, Event, Tutorial, StartGadget, SealGadget, ExitGadget){
	return new Maze({
		size: [3, 3],
		spaces: [ 
		    new Space(1, [1, 0], 'eeoioeee', [0, 2, 4, 0]),
	        new Space(2, [1, 1], 'eeoioioe', [0, 3, 5, 1]),
	        new Space(3, [1, 2], 'eeeeoioe', [0, 0, 6, 2]),
	        new Space(4, [2, 0], 'oioeeeee', [1, 5, 0, 0]),
	        new Space(5, [2, 1], 'oioeeeoi', [2, 6, 0, 4]),
	        new Space(6, [2, 2], 'oeeeeeoi', [3, 0, 0, 5])
		],
		gadgets: [
		    {gadget: new StartGadget(0), position: [0, 1], fixed: false},
		    {gadget: new SealGadget(1), position: [1, 0], fixed: true},
		    {gadget: new SealGadget(2), position: [1, 2], fixed: true},
		    {gadget: new ExitGadget(3), position: [2, 2], fixed: true}
		],
		tutorials: [
		    {showOn: 'startPhase1', tutorial: new Tutorial('1.0', [
				{height: 2, content: messages.gadget_Ceppo_name, type: 'P'},
				{height: 3, src: FileSystem.folder.gadgetImage + 'seal.png', type: 'I'},
				{height: 3, content: messages.gadget_Ceppo_shortDescr_0, type: 'P'}
			])}
		],
		events: [
			{trigger: 'endPhase1', event: new Event('1.1', 'tutorial5.png', messages.tutorial_1_1_0)}
		]
	});
});		
