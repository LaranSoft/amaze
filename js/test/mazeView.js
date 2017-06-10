define(['dragUtils', 'pathRenderer', 'memory', 'support', 'localize', 'animate', 'events'], function(Draggabilly, pathRenderer, memory, support, localize, animate, events){
	
	var gadgetPaddingFactor = 0.77;
	var doorScale = 0.8;   
	var obstacleScale = 0.8;
	
	/** METODI PRIVATI */
	
	function MazeView($container, options){
		
		var self = this;
		
		var spaceSize = options.spaceSize;
		var semiSpaceSize = Math.floor(spaceSize / 2);
		
		var gadgetSize = spaceSize * gadgetPaddingFactor;
		var semiGadgetSize = Math.floor(gadgetSize / 2);
		
		var mazeW = options.maze.width;
		var mazeH = options.maze.height;
		var mazeTop = options.maze.top;
		var mazeLeft = options.maze.left;
		var absMazeT = options.maze.absT;
		
		var translationX = 0;
		var translationY = 0;
		
		var memoryObjects = memory.load('objects') || {};
		
		var $disableInputMask;
		
		this.createDisableInputMask = function(){
			$disableInputMask = $('<div class="disableInputMask" style="display: none;"></div>');
			return $disableInputMask;
		};
		
		var disableInput = function(){
			$disableInputMask.show();
		};
		
		var enableInput = function(){
			$disableInputMask.hide();
		};
		
		var bindDragOnGadget = function($gadget, gadgetId){
			
			var draggie = new Draggabilly($gadget[0], {
				containment: true,
				onDragEnd: function(drag, event, pointer){
					
					disableInput();
					enableInput();
					drag.disable();
				
					var column = Math.floor((pointer.pageX - mazeLeft) / spaceSize);
					var row = Math.floor((pointer.pageY - absMazeT) / spaceSize);
					
					var left = null;
					var top = null;
					var isPlaceable = self.mazeController.isPlaceable(gadgetId, row, column);
					if(isPlaceable === true){
						left = (column * spaceSize) + mazeLeft + semiSpaceSize - semiGadgetSize - drag.startPosition.x; 
						top = (row * spaceSize) + mazeTop + semiSpaceSize - semiGadgetSize - drag.startPosition.y;
					} else {
						left = drag.startTranslation.x;
						top = drag.startTranslation.y;
					}
					
					if($gadget.hasClass('gadget-start')){
						translationX = left;
						translationY = top;
					}
					
					animate($gadget, {translate: [left, top]}, 400, function(){
						disableInput();
						enableInput();
						drag.enable();
						if(isPlaceable === true) self.mazeController.place(gadgetId, row, column);
					});
				}
			});
			
			return draggie;
		};
		
		var spaces = {};
		this.createSpace = function(space){
			
			var spaceTop = (space.getRow() * spaceSize) + mazeTop;
			var spaceLeft = (space.getColumn() * spaceSize) + mazeLeft;
			
			var $space = $('<img class="space" src="./img/level/case/' + space.getWalls() + '.png">');
			MazeView.setRect($space, spaceTop, spaceLeft, spaceSize, spaceSize);
			
			spaces[space.getId()] = space;
			return $space;
		};
		
		var $plates = {};
		this.createPlate = function(space){
			
			var spaceTop = (space.getRow() * spaceSize) + mazeTop;
			var spaceLeft = (space.getColumn() * spaceSize) + mazeLeft;
			
			var $plate = $('<div class="plate"><div class="plateInner"></div></div>');
			MazeView.setRect($plate, spaceTop, spaceLeft, spaceSize, spaceSize);
			
			$plates[space.getId()] = $plate;
			return $plate;
		};

		var gadgets = {};
		var $startGadget;
		this.createGadget = function(gadget, row, column, fixed){
			
			var gadgetTop = (row * spaceSize) + (spaceSize * (1 - gadgetPaddingFactor) / 2) + mazeTop;
			var gadgetLeft = (column * spaceSize) + (spaceSize * (1 - gadgetPaddingFactor) / 2) + mazeLeft;
			
			var gadgetClass = fixed === false ? ' mobileGadget' : '';
			
			var $gadget = $('<div class="gadget gadget-' + gadget.getName() + gadgetClass + '" data-gadget-id="' + gadget.getId() + '"></div>');
			
			MazeView.setRect($gadget, gadgetTop, gadgetLeft, gadgetSize, gadgetSize);
			
			gadgets[gadget.getId()] = $gadget;
			
			if(gadget.getName() === 'start') $startGadget = $gadget;
			
			return $gadget;
		};
		
		this.hideGadget = function(gadgetId){
			gadgets[gadgetId].hide();
		};
		
		this.showGadget = function(gadgetId){
			gadgets[gadgetId].show();
		};
		
		var doors = {};
		var hasDoorBeenCreated = memoryObjects['door'] === true;
		this.createDoor = function(door, doorId){
		
			if(hasDoorBeenCreated !== true){
				hasDoorBeenCreated = true;
				memoryObjects = memory.load('objects');
				
				memoryObjects['door'] = true;
				memory.save('objects', memoryObjects);
			}
			var spaceA = spaces[door[0]];
			var idSpaceB = door[1];
			
			var direction = spaceA.getAdiacents().indexOf(idSpaceB);
			var directionPrefix = direction % 2 == 0 ? 'h' : 'v';
			
			var $door = $('<div class="door door' + directionPrefix + '"></div>');
			
			var doorTop = (spaceA.getRow() * spaceSize) + mazeTop;
			var doorLeft = (spaceA.getColumn() * spaceSize) + mazeLeft;
			
			directionPrefix == 'h' && (doorLeft += spaceSize * (1 - doorScale) / 2);
			directionPrefix == 'v' && (doorTop += spaceSize * (1 - doorScale) / 2);
			
			direction == 1 && (doorLeft += (spaceSize * (1 - (doorScale / 6))));
			direction == 2 && (doorTop += (spaceSize * (1 - (doorScale / 6))));
			
			var doorW = direction % 2 == 0 ? spaceSize * doorScale : spaceSize * (doorScale / 3);
			var doorH = direction % 2 != 0 ? spaceSize * doorScale : spaceSize * (doorScale / 3);
			
			MazeView.setRect($door, doorTop, doorLeft, doorW, doorH);

			doors[doorId] = $door;
			
			return $door;
		};
		
		
		var hasObstacleBeenCreated = memoryObjects['obstacle'] === true;
		
		this.createObstacle = function(obstacle, id){
		
			if(hasObstacleBeenCreated !== true){
				hasObstacleBeenCreated = true;
				memoryObjects = memory.load('objects');
				
				memoryObjects['obstacle'] = true;
				memory.save('objects', memoryObjects);
			}
		
			var spaceA = spaces[obstacle[0]];
			var idSpaceB = obstacle[1];
			
			var direction = spaceA.getAdiacents().indexOf(idSpaceB);
			
			var directionPrefix = direction % 2 == 0 ? 'h' : 'v';
			
			var $obstacle = $('<div class="obstacle obstacle' + direction + '"></div>');
			
			var obstacleTop = (spaceA.getRow() * spaceSize) + mazeTop;
			var obstacleLeft = (spaceA.getColumn() * spaceSize) + mazeLeft;
			
			directionPrefix == 'h' && (obstacleLeft += spaceSize * (1 - obstacleScale) / 2);
			directionPrefix == 'v' && (obstacleTop += spaceSize * (1 - obstacleScale) / 2);
			
			direction == 0 && (obstacleTop -= (spaceSize * (obstacleScale / 4)));
			direction == 1 && (obstacleLeft += spaceSize * (1 - (obstacleScale / 4)));
			direction == 2 && (obstacleTop += spaceSize * (1 - (obstacleScale / 4)));
			direction == 3 && (obstacleLeft -= (spaceSize * (obstacleScale / 4)));
			
			var obstacleW = direction % 2 == 0 ? spaceSize * obstacleScale : spaceSize * (obstacleScale / 2);
			var obstacleH = direction % 2 != 0 ? spaceSize * obstacleScale : spaceSize * (obstacleScale / 2);
			
			MazeView.setRect($obstacle, obstacleTop, obstacleLeft, obstacleW, obstacleH);
			
			return $obstacle;
		};
		
		var items = {};
		this.createItem = function(itemName, itemId){
			var $item = $('<div class="sackItem sackItem-' + itemName + '"></div>');
			items[itemId] = $item;
			return $item;
		};
		
		this.destroyItem = function(itemId){
			items[itemId].remove();
		};
		
		this.moveGadget = function(gadgetId, endPosition){
			var self = this;
			disableInput();
			var $gadget = gadgets[gadgetId];
			
			var row = endPosition[0];
			var column = endPosition[1];
			
			var finalLeft = (column * spaceSize) + mazeLeft + semiSpaceSize - semiGadgetSize;
			var finalTop = (row * spaceSize) + mazeTop + semiSpaceSize - semiGadgetSize;
			
			var jGadget = $gadget[0];	

			var localization = localize( jGadget );
			var translateX = localization.x;
			var translateY = localization.y;
			
			var actualLeft = translateX + parseInt(localization.left, 10);
			var actualTop = translateY + parseInt(localization.top, 10);
			
			var vectorDiffX = translateX + (finalLeft - actualLeft);
			var vectorDiffY = translateY + (finalTop - actualTop);
			
			translationX = vectorDiffX;
			translationY = vectorDiffY;
			
			animate($gadget, {translate: [vectorDiffX, vectorDiffY]}, 400, function(){
			    enableInput();
				self.mazeController.place(gadgetId, row, column);
			});
		};
		
		var canGo = [];
		this.setCanGo = function(spaceId, index, callback){
			var $plate = $plates[spaceId];
			$plate.addClass('used');
			canGo.push($plate);
			$plate.off(events.touchstart).on(events.touchstart, function(){
				callback(index);
			});
		}
		
		this.resetCanGo = function(){
			for(var i=0; i<canGo.length; i++){
				canGo[i].removeClass('used');
			}
			canGo = [];
		}
		
		this.openDoor = function(doorId){
			doors[doorId].hide();
		};
		
		this.closeDoor = function(doorId) {
			doors[doorId].show();
		};
		
		this.startPath = function(){};
		
		this.updatePath = function(path, callback){
			disableInput();
			
			// first: move the gadgetStart if applicable
			
			$startGadget.removeClass($startGadget.attr('going'));
			
			if(path.movements.length > 0){
				var direction = path.movements[path.movements.length - 1];
				if(direction === -1) {
					var position = path.spaces[path.spaces.length - 1];
					var top = mazeTop + (position[0] * spaceSize) + semiSpaceSize - semiGadgetSize;
					var left = mazeLeft + (position[1] * spaceSize) + semiSpaceSize - semiGadgetSize;
					
					var localization = localize( $startGadget[0] );
					
					translationX = left - localization.left;
					translationY = top - localization.top;
					
					animate($startGadget, {opacity: 0}, 400, function(){
						animate($startGadget, {translate: [translationX, translationY]}, 50, function(){
							animate($startGadget, {opacity: 1}, 400, function(){
								pathRenderer.render(path, $container, spaceSize, mazeTop, mazeLeft);
								enableInput();
								callback();
							});
						});
					});
				} else {
					if(direction === 0) translationY -= spaceSize;
					else if(direction == 1) translationX += spaceSize;
					else if(direction == 2) translationY += spaceSize;
					else if(direction == 3) translationX -= spaceSize;
				
					var going = 'going-' + direction;
					$startGadget.attr('going', going);
					$startGadget.addClass(going);
				
					pathRenderer.render(path, $container, spaceSize, mazeTop, mazeLeft);
					animate($startGadget, {translate: [translationX, translationY]}, 150, function(){
						enableInput();
						callback();
					});
				}
				
			} else {
				pathRenderer.render(path, $container, spaceSize, mazeTop, mazeLeft);
				enableInput();
				callback();
			}
		};
		
		var draggies = [];
		this.bindDragOnGadgets = function(gadgetIds){
			for(var i=0; i<gadgetIds.length; i++){
				draggies.push(bindDragOnGadget(gadgets[gadgetIds[i]], gadgetIds[i]));
			}
		};
		
		this.disableDrag = function(){
			for(var i=0; i<draggies.length; i++){
				draggies[i].disable();
			}
		}
		
		this.dead = function(options){
			
			$startGadget.addClass('dead');
		};
		
		this.getSnapshot = function(){
			
			return {
				startGadgetLocalization: localize( $startGadget[0] ),
				path: pathRenderer.getSnapshot(),
				goingTo: $startGadget.attr('going')
			};
			
		};
		
		this.performUndo = function(snapshot){
			var localization = snapshot.startGadgetLocalization;
			var css = {left: localization.left + 'px', top: localization.top + 'px'};
			css[support.transformProperty] = 'translate(' + localization.x + 'px,' + localization.y + 'px)';
			$startGadget.removeClass('dead ' + $startGadget.attr('going'));
			if(snapshot.goingTo){
				$startGadget.addClass(snapshot.goingTo).attr('going', snapshot.goingTo);
			}
			
			$startGadget.css(css);
			
			translationX = localization.x;
			translationY = localization.y;
			
			pathRenderer.performUndo(snapshot.path);
		};
		
		this.fixGadget = function(){
			for(var gadgetId in gadgets){
				gadgets[gadgetId].removeClass('mobileGadget');
			}
		};
		
		this.onCompleteLevel = function(){
			$startGadget.addClass('happy');
		};
	};
	
	MazeView.prototype.setController = function(mazeController){
		var self = this;
		this.mazeController = mazeController;
		
		mazeController.on('startPath', self.fixGadget);
		mazeController.on('startPhase2', self.disableDrag);
		mazeController.on('levelCompleted', self.onCompleteLevel);
		mazeController.on('worldCompleted', self.onCompleteLevel);
	};
	
	MazeView.setRect = function($el, top, left, width, height){
		$el.css({
			top: Math.floor(top),
			left: Math.floor(left),
			width: Math.floor(width),
			height: Math.floor(height)
		});
	};
	
	return MazeView;
});