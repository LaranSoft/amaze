define(['i18n!nls/messages', 'jquery', 'events', 'memory', 'tutorial', 'textUtils', 'fileSystem', 'animate'], function(messages, $, Events, memory, Tutorial, adjustContent, FileSystem, animate){
	
	var $tutorialMask;
	var $tutorialContainer;
	var $tutorialBtn;
	var $tutorialWrapper;
	
	var btnContainerH;
	
	var memoryTutorials;
	var memoryEvents;
	var initialized = false;
	
	var guideSrcFolder = FileSystem.folder.gadgetImage;
	
	var guide = new Tutorial('g', [
		{height: 1, content: messages.tutorialHeader, type: 'P'},
		{height: 1, totalWidth: 3, type: 'R', subObjects: [
			{width: 1, src: guideSrcFolder + 'popyN.png', name: 'start', guide: new Tutorial('g1', [
				{height: 1, content: messages.gadget_Popy_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'popyN.png', type: 'I'},
				{height: 4, content: messages.gadget_Popy_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'exit.png', name: 'exit', guide: new Tutorial('g2', [
				{height: 1, content: messages.gadget_Exit_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'exit.png', type: 'I'},
				{height: 4, content: messages.gadget_Exit_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'seal.png', name: 'seal', guide: new Tutorial('g3', [
				{height: 1, content: messages.gadget_Ceppo_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'seal.png', type: 'I'},
				{height: 4, content: messages.gadget_Ceppo_guide_0, type: 'P'}
			])}
		]},
		{height: 1, totalWidth: 3, type: 'R', subObjects: [
			{width: 1, src: guideSrcFolder + 'forceDirection2.png', name: 'forceDirection', guide: new Tutorial('g4', [
				{height: 1, content: messages.gadget_ForcedDirection_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'forceDirection2.png', type: 'I'},
				{height: 4, content: messages.gadget_ForcedDirection_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'key.png', name: 'key', guide: new Tutorial('g5', [
				{height: 1, content: messages.gadget_Chiave_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'key.png', type: 'I'},
				{height: 4, content: messages.gadget_Chiave_guide_0, type: 'P'}
			])},
			{width: 1, src: 'doorV.png', name: 'door', guide: new Tutorial('g6', [
				{height: 1, content: messages.gadget_Door_name, type: 'P'},
				{height: 1, src: 'doorV.png', type: 'I'},
				{height: 4, content: messages.gadget_Door_guide_0, type: 'P'}
			])}
		]},
		{height: 1, totalWidth: 3, type: 'R', subObjects: [
			{width: 1, src: guideSrcFolder + 'life.png', name: 'life', guide: new Tutorial('g7', [
				{height: 1, content: messages.gadget_LifePoint_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'life.png', type: 'I'},
				{height: 4, content: messages.gadget_LifePoint_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'damage.png', name: 'damage', guide: new Tutorial('g8', [
				{height: 1, content: messages.gadget_Tagliola_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'damage.png', type: 'I'},
				{height: 4, content: messages.gadget_Tagliola_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'bowTrap.png', name: 'bowTrap', guide: new Tutorial('g9', [
				{height: 1, content: messages.gadget_BowTrap_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'bowTrap.png', type: 'I'},
				{height: 4, content: messages.gadget_BowTrap_guide_0, type: 'P'}
			])}
		]},
		{height: 1, totalWidth: 3, type: 'R', subObjects: [
			{width: 1, src: guideSrcFolder + 'teleport1_1.png', name: 'teleport1', guide: new Tutorial('g10', [
				{height: 1, content: messages.gadget_Tunnel_name, type: 'P'},
				{height: 1, src: guideSrcFolder + 'teleport1_1.png', type: 'I'},
				{height: 4, content: messages.gadget_Tunnel_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'teleport1_0.png', name: 'teleport0', guide: new Tutorial('g11', [
				{height: 1, content: messages.gadget_MoleTunnel_name, type: 'P'},
				{height: 2, src: guideSrcFolder + 'teleport1_0.png', type: 'I'},
				{height: 5, content: messages.gadget_MoleTunnel_guide_0, type: 'P'}
			])},
			{width: 1, src: guideSrcFolder + 'teleportSwitch1.png', name: 'teleportSwitch', guide: new Tutorial('g11', [
				{height: 1, content: messages.gadget_Hammer_name, type: 'P'},
				{height: 2, src: guideSrcFolder + 'teleportSwitch1.png', type: 'I'},
				{height: 5, content: messages.gadget_Hammer_guide_0, type: 'P'}
			])}
		]},
		{height: 1, totalWidth: 3, type: 'R', subObjects: [
			{width: 1, src: 'obstacle1.png', name: 'obstacle', guide: new Tutorial('g12', [
				{height: 1, content: messages.gadget_Ostacolo_name, type: 'P'},
				{height: 1, src: 'obstacle1.png', type: 'I'},
				{height: 4, content: messages.gadget_Ostacolo_guide_0, type: 'P'}
			])}
		]}
	]);
	
	var init = function(){
		if(initialized === false){
			
			memoryTutorials = memory.load('tutorials') || {};
			memoryEvents = memory.load('events') || {};
			
			$tutorialMask = $('#tutorialMask');
			$tutorialWrapper = $('#tutorialWrapper');
			$tutorialContainer = $('#tutorialContainer');
			$tutorialBtn = $('#tutorialBtn');
			
			$tutorialBtn.css('font-size', $tutorialBtn.height() * 4 / 5);
			
			initialized = true;
		}
		$tutorialMask.addClass('hidden');
	};
	
	var hide = function(){
		$tutorialMask.addClass('hidden');
	};	
	
	var showTutorial = function(tutorial, callback){
		$tutorialContainer.html('');
		
		var objects = tutorial.objects;
		var totalHeight = tutorial.totalHeight;
		
		for(var i=0; i<objects.length; i++){
			
			var object = objects[i];
			
			var height = object.height;
			var type = object.type;
			
			var objClass = 'tutorial';
			var objContent = '';
			var subObjects = null;
			var objCss = {
				height: (height / totalHeight * 100) + '%'
			};
			
			if(type === 'I'){
				objCss['background-image'] = 'url(img/' + object.src + ')';
				objClass += 'Image';
			} else if(type === 'P') {
				objClass += 'Paragraph';
				objContent = object.content;
			} else if(type === 'R') {
				objClass += 'Row';
				
				subObjects = object.subObjects;
				
			} else throw 'invalid object type';
			
			var $obj = $('<div class="' + objClass + '"></div>');
			
			$obj.css(objCss);
			
			$tutorialContainer.append($obj);
			
			if(objContent){
				adjustContent($obj, objContent);
			}
			
			if(subObjects) {
				var memoryObjects = memory.load('objects') || {};
				var totalWidth = object.totalWidth;
			
				for(var j=0; j<subObjects.length; j++){
					var subObject = subObjects[j];
					var width = subObject.width;
				
					var $subObj = $('<div class="tutorialSubImage"></div>');
					
					$subObj.css({
						width: (width / totalWidth * 100) + '%',
						'background-image': 'url(img/' + subObject.src + ')'
					});
					
					if(memoryObjects[subObject.name] !== true){
						$subObj.css('visibility', 'hidden');
					} else {
						if(subObject.guide) {
							$subObj.on(Events.click, {guide: subObject.guide}, function(event){
								showTutorial(event.data.guide, showGuide);
							});
						}
					}
					
					$obj.append($subObj);
				}
			}
		}
		
		$tutorialBtn.off(Events.click).on(Events.click, callback);
		
		$tutorialMask.removeClass('hidden');
		
		memory.save('tutorials', memoryTutorials);
		
	};
	
	var manageTutorials = function(index, tutorials) {
		var callback = hide;
		if(index < tutorials.length-1) callback = function(){
			manageTutorials(index+1, tutorials);
		};
		
		showTutorial(tutorials[index], callback);
	}
	
	var showGuide = function(){
		showTutorial(guide, hide);
	}
	
	var manageEvent = function(event){
	
		var $eventMask = $('<div id="eventMask" class="panel" style="opacity: 0;"></div>');
		var $eventMessageWrapper = $('<div id="eventMessageWrapper"></div>');
		var $eventMessage = $('<div id="eventMessage"></div>');

		$eventMask.append($eventMessageWrapper);
		$eventMessageWrapper.append($eventMessage);
		
		$eventMask.on(Events.touchstart, function(){
			animate($eventMask, {opacity: 0}, 400, function(){
				$eventMask.remove();
			});
		});
		
		$eventMask.css('background-image', 'url(img/tutorial/' + event.img + ')');
		
		$('body').append($eventMask);
		
		adjustContent($eventMessage.text(''), event.text);
		animate($eventMask, {opacity: 1}, 400);
		
		memory.save('events', memoryEvents);
		
		
	}
	
	return {
		init: init,
		show: function(tutorials){
			
			// per prima cosa rimuovo dall'array tutorials tutti i tutorials che sono gia' stati visti
			
			var tutorialsToShow = [];
			for(var i=0; i<tutorials.length; i++){
				if(tutorials[i].id) {
					if(memoryTutorials[tutorials[i].id] !== true){
						memoryTutorials[tutorials[i].id] = true;
						tutorialsToShow.push(tutorials[i]);
					}
				} else {
					tutorialsToShow.push(tutorials[i]);
				}
			}
			tutorialsToShow.length > 0 && manageTutorials(0, tutorialsToShow);
			
		},
		showEvent: function(event){
			var showEvent = false;
			if(event.id) {
				if(memoryEvents[event.id] !== true){
					memoryEvents[event.id] = true;
					showEvent = true;
				}
			} else {
				showEvent = true;
			}
			
			showEvent === true && manageEvent(event);
		},
		hide: hide,
		showGuide: showGuide
	};
});