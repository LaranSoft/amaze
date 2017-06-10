define(['i18n!nls/messages', 'test/space', 'test/maze', 'mazeEvent', 'gadget/startGadget', 'gadget/sealGadget', 'gadget/exitGadget'], function(messages, Space, Maze, Event, StartGadget, SealGadget, ExitGadget){
	return new Maze({
		size: [2, 3],
		spaces: [ 
		    new Space(1, [1, 0], 'eeoeeeee', [0, 2, 0, 0]),
		    new Space(2, [1, 1], 'eeoeeeoe', [0, 3, 0, 1]),
		    new Space(3, [1, 2], 'eeeeeeoe', [0, 0, 0, 2])
		],
		gadgets: [
		    {gadget: new StartGadget(0), position: [0, 1], fixed: false},
		    {gadget: new SealGadget(1), position: [1, 1], fixed: true},
		    {gadget: new ExitGadget(2), position: [1, 2], fixed: true}
		],
		events: [
		    {trigger: 'startPhase1', event: new Event('0.0', 'tutorial1.png', messages.tutorial00)},
			{trigger: 'endPhase1', event: new Event('0.1', 'tutorial2.png', messages.tutorial01)},
			{trigger: 'startPhase2', event: new Event('0.2', 'tutorial3.png', messages.tutorial02)},
			{trigger: 'step1', event: new Event('0.3', 'tutorial4.png', messages.tutorial03)}
		]
	});
});	