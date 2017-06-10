define(['mazeStatus', 'memory', 'tutorialManager'], function(MazeStatus, memory, TM){
	
	function MazeController(maze, stage){
		var self = this;
		
		var positions = {};
		var gadgets = {};
		var spaces = {};
		var spaceIds = [];
		var enterFunctions = {};
		var adiacents = {};
		var mazeView;
		
		this.setView = function(view){
			mazeView = view;
		};
		
		var mazeSpaces = maze.getSpaces();
		for(var i=0; i<mazeSpaces.length; i++){
			var space = mazeSpaces[i];
			
			var row = space.getRow();
			var column = space.getColumn();
			var spaceId = space.getId();
			
			var rowCol = row + '-' + column;
			positions[rowCol] || (positions[rowCol] = {});
			
			positions[rowCol].space = space;
			
			spaceIds.push(spaceId);
			spaces[spaceId] = space;
			adiacents[spaceId] = space.getAdiacents();
		}
		
		var doors = maze.getDoors();
		
		this.getAdiacents = function(spaceId){
			return adiacents[spaceId];
		};
		
		this.setAdiacents = function(spaceId, newAdiacents){
			adiacents[spaceId] = newAdiacents;
		};
		
		var mazeGadgets = maze.getGadgets();
		for(var i=0; i<mazeGadgets.length; i++){
			var gadgetDescription = mazeGadgets[i];
			
			var row = gadgetDescription.position[0];
			var column = gadgetDescription.position[1];
			
			var rowCol = row + '-' + column;
			positions[rowCol] || (positions[rowCol] = {});
			
			positions[rowCol].gadget = gadgetDescription.gadget;
			
			gadgets[gadgetDescription.gadget.getId()] = {gadget: gadgetDescription.gadget, row: row, column: column, fixed: gadgetDescription.fixed};
		}
		
		this.isPlaceable = function(gadgetId, row, column){
			
			var rowCol = row + '-' + column;
			if(!positions[rowCol]) return false;
			
			var space = positions[rowCol].space;
			if(!space) return false;
			
			if(positions[rowCol].gadget) return false;
			
			return gadgets[gadgetId].gadget.canBePlacedIn(this, space.getId());
		};
		
		this.place = function(gadgetId, row, column){
			var gadgetDescription = gadgets[gadgetId];
			var oldRowCol = gadgetDescription.row + '-' + gadgetDescription.column;
			
			if(positions[oldRowCol]) positions[oldRowCol].gadget = null; 
			
			var rowCol = row + '-' + column;
			if(!positions[rowCol]) throw 'invalid place() method invocation with row ' + row + ' and column ' + column;
			
			positions[rowCol].gadget = gadgetDescription.gadget;

			gadgets[gadgetId].row = row;
			gadgets[gadgetId].column = column;
			
			for(var gadgetId in gadgets){
				var gadget = gadgets[gadgetId];
				if(!positions[gadget.row + '-' + gadget.column].space) return;
			}
			
			trigger('endPhase1', {}, true);
			trigger('noUnplacedGadgets');
		};

		this.start = function(){
			var gadgetIds = [];
			
			for(var gadgetId in gadgets){
				if(gadgets[gadgetId].fixed !== true){
					gadgetIds.push(gadgetId);
				}
			}
			
			mazeView.bindDragOnGadgets(gadgetIds);
			trigger('startPhase1');
			
		};
		
		var mazeStatus = null;
		this.startPath = function(){
			
			for(var gadgetId in gadgets){
				var gadget = gadgets[gadgetId].gadget;
				gadget.applyTo(self);
			}
			
			mazeStatus = new MazeStatus({spaceIds: spaceIds, adiacents: adiacents});
			
			var startingSpace = spaces[start];
			
			evaluateDoors();
			
			mazeView.startPath();
			manageMovement(start);
			
			trigger('startPhase2');
			trigger('startPath');
		};
		
		this.reload = function(){
			trigger('reload');
		};
		
		this.nextLevel = function(){
			trigger('nextLevel');
		};
		
		var events = {};
		this.on = function(event, callback){
			events[event] || (events[event] = []);
			events[event].push(callback);
		};
		
		var bindTutorial = function(tutorialTrigger, tutorials){
			self.on(tutorialTrigger, function(){
				TM.show(tutorials);
			});
		};
		
		var tutorials = maze.getTutorials();
		var tutorialsTriggers = {};
		for(var i=0; i<tutorials.length; i++){
			var tutorial = tutorials[i];
			tutorialsTriggers[tutorial.showOn] || (tutorialsTriggers[tutorial.showOn] = []);
			
			tutorialsTriggers[tutorial.showOn].push(tutorial.tutorial);
		};
		
		for(var tutorialTrigger in tutorialsTriggers){
			bindTutorial(tutorialTrigger, tutorialsTriggers[tutorialTrigger]);
		}
		
		
		var bindMazeEvent = function(eventTrigger, events){
			self.on(eventTrigger, function(){
				TM.showEvent(events);
			});
		};
		
		var mazeEvents = maze.getEvents();
		var mazeEventsTriggers = {};
		for(var i=0; i<mazeEvents.length; i++){
			var mazeEvent = mazeEvents[i];
			mazeEventsTriggers[mazeEvent.trigger] = mazeEvent.event;
		};
		
		for(var mazeEventTrigger in mazeEventsTriggers){
			bindMazeEvent(mazeEventTrigger, mazeEventsTriggers[mazeEventTrigger]);
		}
		
		this.getSpaceId = function(gadgetId){
			return positions[gadgets[gadgetId].row + '-' + gadgets[gadgetId].column].space.getId();
		};
		
		this.getSpaceIds = function(gadgetName){
			var spaceIds = [];
			for(var gadgetId in gadgets){
				var gadgetDescription = gadgets[gadgetId];
				if(gadgetDescription.gadget.getName() === gadgetName){
					spaceIds.push(positions[gadgetDescription.row + '-' + gadgetDescription.column].space.getId());
				}
			}
			return spaceIds;
		};
		
		this.getGadgetName = function(spaceId){
			var space = spaces[spaceId];
			var gadget = positions[space.getRow() + '-' + space.getColumn()].gadget;
			var gadgetName = null;
			if(gadget != null){
				gadgetName = gadget.getName();
			}
			return gadgetName;
		};
		
		this.getGadgetId = function(spaceId){
			var space = spaces[spaceId];
			var gadget = positions[space.getRow() + '-' + space.getColumn()].gadget;
			var gadgetId = null;
			if(gadget != null){
				gadgetId = gadget.getId();
			}
			return gadgetId;
		};
		
		this.addEnterFunction = function(spaceId, enterFunction){
			enterFunctions[spaceId] || (enterFunctions[spaceId] = []);
			enterFunctions[spaceId].push(enterFunction);
		};
		
		this.destroyGadget = function(gadgetId){
			undoLevel || (undoLevel = {});
			undoLevel.gadgets || (undoLevel.gadgets = []);
			undoLevel.gadgets.push(gadgetId);
			mazeView.hideGadget(gadgetId);
		};
		
		var start = null;
		this.setStart = function(spaceId){
			start = spaceId;
		};
		
		var trigger = function(event, data, once){
			if(events[event]){
				once = once === false ? false : true;
				for(var i=0; i<events[event].length; i++){
					events[event][i](data);
				}
				if(once) events[event] = [];
			}
		};
		
		var canGo = function(index){
			
			var spaceId = mazeStatus.getActualSpaceId();
			
			var targetSpaceId = adiacents[spaceId][index];
			
			if(!spaces[targetSpaceId]) return 0;
			
			if(mazeStatus.isVisited(targetSpaceId) === true) return 0;
			
			for(var j=0; j<doors.length; j++){
				if((doors[j][0] == spaceId && doors[j][1] == targetSpaceId) || (doors[j][1] == spaceId && doors[j][0] == targetSpaceId)){
					if(mazeStatus.getKeys() <= 0) return 0;
				}
			}
			
			return targetSpaceId;
		};
		
		var go = function(index){
			var targetSpaceId = canGo(index);
			targetSpaceId !== 0 && manageMovement(targetSpaceId, index);
		};
		
		this.goUp = function(){go(0);};
		this.goRight = function(){go(1);};
		this.goDown = function(){go(2);};
		this.goLeft = function(){go(3);};
		
		var undoLevel = null;
		var imDead = false;
		
		var updateMovements = function(){
			var spaceId = mazeStatus.getActualSpaceId();
			
			for(var i=0; i<4; i++){
				canGo(i) && mazeView.setCanGo(adiacents[spaceId][i], i, function(index){go(index);});
			}
		}
		
		var manageMovement = function(spaceId, direction){
		
			if(direction !== -1 && imDead) return;
		
			if(direction != null && direction >= 0){
				undoLevel = mazeView.getSnapshot();
				mazeStatus.addUndoLevel(undoLevel);
			}
		
			if(mazeStatus.hasUndo()) trigger('moreUndo', {}, false);
			else trigger('noMoreUndo', {}, false);
		
			var targetSpace = spaces[spaceId];
			
			mazeStatus.moveTo(spaceId, targetSpace.getRow(), targetSpace.getColumn(), direction);
			mazeView.resetCanGo();
			mazeView.updatePath(mazeStatus.getPath(), function(){
				
				trigger('step', {}, false);
				trigger('step' + direction, {}, false);
				
				var enterFuncts = enterFunctions[spaceId];
				if(enterFuncts){
					for(var i=0; i<enterFuncts.length; i++){
						enterFuncts[i](mazeStatus);
					}
				}
				
				imDead = false;
				var levelCompleted = false;
				var statusBasedEffects = mazeStatus.getStatusBasedEffects();
				for(var i=0; i<statusBasedEffects.length; i++){
					var sbeOutcome = statusBasedEffects[i](mazeStatus);
					if(sbeOutcome < 0){
						imDead = true;
					} else if(sbeOutcome > 0){
						levelCompleted = true;
					}
				}
				mazeStatus.eraseStatusBasedEffect();
				
				mazeStatus.resolveEots();
				
				var sack = mazeStatus.getSack();
				for(var i=0; i<sack.length; i++){
					var item = sack[i];
					var $item = mazeView.createItem(item.name, item.id);
					
					trigger('itemCreated', {$item: $item});
				}
				mazeStatus.emptySack();
				
				var usedObjects = mazeStatus.getUsedObjects();
				for(var i=0; i<usedObjects.length; i++){
					mazeView.destroyItem(usedObjects[i]);
				}
				mazeStatus.cancelUsedObjects();
				
				if(imDead && levelCompleted) levelCompleted = false;
				
				if(levelCompleted){
					var lastStageCompleted = memory.load('lastStage');
					if(Number(stage) > Number(lastStageCompleted)){
						memory.save('lastStage', stage);
					}
					if(maze.isLast()) trigger('worldCompleted');
					else trigger('levelCompleted');
					
					
				} else if(!imDead){
				
					var redirect = mazeStatus.getRedirect();
					if(redirect){
						mazeStatus.cancelRedirect();
						manageMovement(redirect, -1);
						return;
					} else {
						imDead = mazeStatus.isDeadPath();
					}
				}
				
				if(imDead){
					mazeView.dead();
				} else {
					updateMovements();
				}
				
				undoLevel = null;
			});
		};
		
		var evaluateDoors = function(){
			
			var enterFunction = function(status){
				var pathSpaces = status.getPath().spaceIds;
				
				if(pathSpaces.length >= 2){
					var spaceId = pathSpaces[pathSpaces.length-1];
					var lastSpaceId = pathSpaces[pathSpaces.length-2];
				
					for(var j=0; j<doors.length; j++){
						if((doors[j][0] == spaceId && doors[j][1] == lastSpaceId) || (doors[j][1] == spaceId && doors[j][0] == lastSpaceId)){
							undoLevel.doors || (undoLevel.doors = []);
							undoLevel.doors.push(j);
							mazeView.openDoor(j);
							status.setUsedObject('key');
							status.removeKey();
							break;
						}
					}
				}
			};
			
			for(var i=0; i<doors.length; i++){
				var idSpaceA = doors[i][0];
				var idSpaceB = doors[i][1];
				
				self.addEnterFunction(idSpaceA, enterFunction);
				self.addEnterFunction(idSpaceB, enterFunction);
			}
		};
		
		this.moveGadget = function(startPosition, endPosition){
			var rowCol = startPosition[0] + '-' + startPosition[1];
			var gadgetId = positions[rowCol].gadget.getId();
			mazeView.moveGadget(gadgetId, endPosition);
		};
		
		this.undo = function(){
			var undo = mazeStatus.popUndoLevel();
			if(undo.isLast === true){
				trigger('noMoreUndo', {}, false);
			} else trigger('moreUndo', {}, false);
			if(undo.level.gadgets) {
				for(var gadgetId in undo.level.gadgets){
					mazeView.showGadget(undo.level.gadgets[gadgetId]);
				}
			}
			if(undo.level.doors) {
				for(var doorId in undo.level.doors){
					mazeView.closeDoor(undo.level.doors[doorId]);
				}
			}
			mazeView.performUndo(undo.level);
			imDead = false;
			mazeView.resetCanGo();
			updateMovements();
		}
		
		this.getCredits = function(){
			return maze.getCredits();
		}
		
	};
	
	return MazeController;
	
});
