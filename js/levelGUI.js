define(['i18n!nls/messages', 'levelSelection', 'events', 'memory', 'tutorialManager', 'tutorial', 'textUtils', 'animate'], function(messages, levelSelection, Events, memory, TM, Tutorial, adjustContent, animate){
	
	var initialized = false;
	
	var mazeControls = null;
	
	var $playButton = null;
	var $completedLevelMask = null;
	
	var $pageLevel = null;
	var $pageSelection = null;
	var $resetButton = null;
	var $tutorialButton = null;
	var $undoButton = null;
	var $nextButton = null;
	
	var swipeInitialized = false;
	
	var $credits = null;
	
	
	/**
	 * METODI PRIVATI
	 */
	var initialize = function(){
		
		$pageLevel = $('#pageLevel');
		$pageSelection = $('#pageSelection');
		
		var $mainMenuButton = $('#mainMenuBtn');
		$mainMenuButton.on(Events.click, goToPageSelection);
		
		var $bottom = $('#bottom');
		$credits = $('#credits');
		var bottomH = $bottom.height();
		
		$playButton = $('#playBtn');
		$playButton.on(Events.click, function(){
			setPlayButtonVisible(false);
			mazeControls.startPath();
		});
		
		$undoButton = $('#undoBtn');
		$nextButton = $('#nextBtn');
		
		$undoButton.on(Events.click, function(){
			mazeControls.undo();
		});
		
		$nextButton.on(Events.touchstart, function(){
			setCompletedLevelMaskVisible(false);
			mazeControls.nextLevel();
		});
		
		var undoBtnH = $undoButton.height();
		$undoButton.css({'font-size': undoBtnH*3/4, 'line-height': undoBtnH + 'px', 'border-radius': undoBtnH/3});
		$nextButton.css({'font-size': undoBtnH*3/4, 'line-height': undoBtnH + 'px', 'border-radius': undoBtnH/3}).text(messages.next);
		$playButton.css({'font-size': undoBtnH*3/4, 'line-height': undoBtnH + 'px', 'border-radius': undoBtnH/3});
		
		$resetButton = $('#resetBtn');
		$resetButton.on(Events.touchstart, resetLevel);
		
		var $tutorialButton = $('#questionBtn');
		
		$tutorialButton.on(Events.touchstart, function(){
			TM.showGuide();
		});
	};
	
	var setPlayButtonVisible = function(visible){
		visible = visible === true ? true : false;
		
		if(visible === true) $playButton.show();
		else $playButton.hide();
	};
	
	var setUndoButtonVisible = function(visible){
		visible = visible === true ? true : false;
		
		if(visible === true) $undoButton.show();
		else $undoButton.hide();
	};
	
	var setCompletedLevelMaskVisible = function(visible){
		visible = visible === true ? true : false;
		
		setUndoButtonVisible(false);
		
		if(visible === true){
			$nextButton.show();
		} else $nextButton.hide();
	};
	
	var goToPageSelection = function(){
		setCompletedLevelMaskVisible(false);
		animate($pageLevel, {opacity: 0}, 500, function(){
		
			$pageLevel.hide().addClass('hidden');
			$pageSelection.css('opacity', 1).show();
			
			levelSelection.update('content', memory.load('lastStage'));
			
			$pageSelection.removeClass('hidden');
		});
	};
	
	var resetLevel = function(){
		setCompletedLevelMaskVisible(false);
		if($resetButton.attr('clicked') !== '1'){
			$resetButton.attr('clicked', '1');
			mazeControls.reload();
			$resetButton.attr('clicked', '0');
		}
	};
	
	var goUp = function(){mazeControls.goUp();};
	var goRight = function(){mazeControls.goRight();};
	var goDown = function(){mazeControls.goDown();};
	var goLeft = function(){mazeControls.goLeft();};
	
	return {
		bindTo: function(maze, level){
			
			if(!maze) throw 'cannot bind level GUI to a null maze';
			
			if(initialized === false){
				initialize();
				initialized = true;
			}
			
			setCompletedLevelMaskVisible(false);
			setUndoButtonVisible(false);
			setPlayButtonVisible(false);
			
			var credits = maze.getCredits();
			credits && (credits = ' - ' + credits);
			
			adjustContent($credits.show(), messages.level + level + credits);
			
			mazeControls = maze;
			
			mazeControls.on('noUnplacedGadgets', function(){
				$credits.text('').hide();
				setPlayButtonVisible(true);
			});
			
			mazeControls.on('levelCompleted', function(){
				setCompletedLevelMaskVisible(true);
			});
			
			mazeControls.on('worldCompleted', function(){
				setUndoButtonVisible(false);
			});
			
			mazeControls.on('itemCreated', function(data){
				// $('#bottom').append(data.$item);
			});
			
			mazeControls.on('noMoreUndo', function(data){
				setUndoButtonVisible(false);
			});
			
			mazeControls.on('moreUndo', function(data){
				setUndoButtonVisible(true);
			});
		}
	};
	
});