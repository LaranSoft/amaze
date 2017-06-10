define(['test/mazeView', 'test/mazeController'], function(MazeView, MazeController){
	
	/** COSTANTI */
	var exitTokenPadding = 0.8;
	var characterTokenPadding = 0.8;
	var padding = 5;
	
	/**
	 * Costruisce una nuova istanza di MazeRenderer, legata allo specifico <$container>
	 */
	function MazeRenderer($container){
		
		/** Disegna lo stadio <maze> nell'elemento <$container> e restituisce un oggetto controller. */
		this.render = function(maze, stage){
			var self = this;
			
			$container.empty();
			
			var containerW = $container.width();
			var containerH = $container.height();
			
			var availableW = containerW - (2*padding);
			var availableH = containerH - (2*padding);
			
			var containerTop = $container.offset().top;
			var caseSize = 0;
			var mazeSizeW = maze.getWidth();
			var mazeSizeH = maze.getHeight();
			
			var maxCaseW = Math.floor(availableW / mazeSizeW);
				
			if(maxCaseW * mazeSizeH <= availableH){
				caseSize = maxCaseW;
			} else {
				caseSize = Math.floor(availableH / mazeSizeH);
			}
				
			if(caseSize > availableH / 1.1){
				caseSize = Math.floor(availableH / 1.1);
			}
			if(caseSize > availableW / 3){
				caseSize = Math.floor(availableW / 3);
			}
				
			var mazeW = caseSize * mazeSizeW;
			var mazeH = caseSize * mazeSizeH;
			var mazeTop = Math.floor((containerH - mazeH) / 2);
			var mazeLeft = Math.floor((containerW - mazeW) / 2);
			
			var absMazeT = mazeTop + containerTop;
			var semiCaseSize = Math.floor(caseSize / 2);
			
			var $backgroundImage = $('<img alt="." src="./img/level/bg.jpg">');
			$backgroundImage.css({width: containerW + 'px', height: containerH + 'px'});
						
			$container.append($backgroundImage);
			
			var mazeController = new MazeController(maze, stage);
			
			var mazeView = new MazeView($container, {
				spaceSize: caseSize,
				maze: {
					top: mazeTop,
					left: mazeLeft,
					width: mazeW,
					height: mazeH,
					absT: absMazeT
				}
			});
			
			mazeView.setController(mazeController);
			mazeController.setView(mazeView);
			
			var spaces = maze.getSpaces();
			for(var i=0; i<spaces.length; i++){
				var space = spaces[i];
				
				var $space = mazeView.createSpace(space);
				
				$container.append($space);
				
				var $plate = mazeView.createPlate(space);
				
				$container.append($plate);
			}

			var gadgets = maze.getGadgets();
			for(i=0; i<gadgets.length; i++){
				var gadgetDescription = gadgets[i];
				
				var $gadget = mazeView.createGadget(gadgetDescription.gadget, gadgetDescription.position[0], gadgetDescription.position[1], gadgetDescription.fixed);
				
				$container.append($gadget);
			}
			
			var doors = maze.getDoors();
			for(var i=0; i<doors.length; i++){
				
				var $door = mazeView.createDoor(doors[i], i);
				
				$container.append($door);
			}
			
			var obstacles = maze.getObstacles();
			for(var i=0; i<obstacles.length; i++){
				var $obstacle = mazeView.createObstacle(obstacles[i], i);
				
				$container.append($obstacle);
			}
			
			$container.append(mazeView.createDisableInputMask());
			
			return mazeController;
		}
		
	};
	
	return MazeRenderer;
	
});