define(['jquery', 'events', 'levels', 'memory', 'test/mazeRenderer', 'tutorialManager', 'animate'], function($, Events, levels, memory, MazeRenderer, TutorialManager, animate){
		
	var stageCount = levels.getStageCount();
	
	var mazeRenderer = new MazeRenderer($('#middle'));
	
	var $pageSelection = $('#pageSelection');
	
	var onReload = function(loadedLevel, dataLevelIndex, GUI){
		$('#middle').empty();
		TutorialManager.init();
		var mazeController = mazeRenderer.render(loadedLevel, dataLevelIndex);
		GUI.bindTo(mazeController, dataLevelIndex);
		mazeController.on('reload', function(){
			onReload(loadedLevel, dataLevelIndex, GUI);
		});
		mazeController.on('nextLevel', function(){
			onLoad(Number(dataLevelIndex) + 1);
		});
		mazeController.start();
	};
	
	var onLoad = function(dataLevelIndex){
		var level = levels.getLevel(dataLevelIndex);
		require(['level/' + level, 'levelGUI'], function(loadedLevel, GUI){
			onReload(loadedLevel, dataLevelIndex, GUI);
		});
	};
	
	return {
		update: function(containerId, lastStage){
			lastStage = Number(lastStage);
			
			if(isNaN(lastStage)) lastStage = 0;
			
//			lastStage = levels.getStageCount();
			
			var $container = $('#' + containerId);
			
			for(var i=0; i<stageCount; i++){
				var $stage = $('[data-level="' + (i+1) + '"]');
				
				if(i > lastStage){
					$stage.addClass('locked');
				} else {
					$stage.removeClass('locked').addClass('active');
					
					if(i < lastStage){
						$stage.addClass('completed');
					}
				}
			}
			
		},
		render: function(containerId){
			var lastStage = memory.load('lastStage');
			
			lastStage = Number(lastStage);
			
			if(isNaN(lastStage)) lastStage = 0;
			
//			lastStage = levels.getStageCount();
			
			var $container = $('#' + containerId);
			
			$container.empty();
			
			var containerW = $container.width();
			var containerH = $container.height();
			
			var max = containerW > containerH ? containerW : containerH;
			
			var padding = 10;
			var tilesPerLine = 5;
			var availableW = containerW - padding*(tilesPerLine+1);
			
			var tileDimension = Math.floor(availableW / tilesPerLine);
			
			var starDimension = tileDimension * 3 / 11;
			var starPadding = starDimension / 6;
			
			var $backgroundImage = $('<img alt="." src="./img/bg.jpg">');
			$backgroundImage.css({width: containerW + 'px', height: containerH + 'px'});
						
			$container.append($backgroundImage);
			
			var $stageContainer = $('<div class="hidden"></div>');
			
			var loadLevel = function(event){
				var $self = $(this);
				
				if($self.hasClass('locked')) return;
				
				var clicked = $self.attr('clicked');
				if(clicked !== '1') {
					
					$self.attr('clicked', '1');
					
					setTimeout(function(){
						animate($pageSelection, {opacity: 0}, 500, function(){
							
							$pageSelection.hide().addClass('hidden');
							
							$('#pageLevel').removeClass('hidden').css('opacity', 1).show();
							$('#middle').empty();
							
							var dataLevelIndex = $self.attr('data-level');
							
							onLoad(dataLevelIndex);
							
							$self.attr('clicked', '0').addClass('clicked');
						});
					}, 0);
				}
			};
			
			for(var i=0; i<stageCount; i++){
				
				var $stage = $('<div class="stage" data-level="' + (i+1) + '">' + (i+1) + '</div>');
				
				$stage.css({
					'height': tileDimension + 'px',
					'width': tileDimension + 'px',
					'border-radius': (tileDimension/5) + 'px',
					'font-size': (tileDimension * 9/10) + 'px',
					'left': (padding + (i%(tilesPerLine)) * (tileDimension + padding)) + 'px',
					'top': (padding + Math.floor(i/tilesPerLine)  * (tileDimension + padding)) + 'px'
				});
				
				if(i > lastStage){
					
					$stage.addClass('locked');
					
				} else {
					
					$stage.addClass('active');
					
					
					if(i < lastStage){
						$stage.addClass('completed');
					}
				}
				
				/** per un qualche bug touchstart non viene recepito! */
				$stage.on(Events.click, loadLevel);
				$stageContainer.append($stage);
			}
			
			$container.append($stageContainer);
			
			$stageContainer.removeClass('hidden');
		}
	};
});