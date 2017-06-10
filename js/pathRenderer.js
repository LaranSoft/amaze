define(function(){
	
	var segmentChanges = null;
	
	var pathRenderer = {
		
		css: {
			'background-color': '#f36d0a',
			'border-style': 'solid',
			'border-width': '0px',
			'opacity': 1
		},
		
		startRadiusPercentage: 10,
		lastDirection: -1,
		
		segments: [],
		activeSegment: null,
	
		destroyPath: function(){
			for(var i=0; i<this.segments.length; i++){
				this.segments[i].remove();
			}
			this.segments.splice(0, this.segments.length);
			
			this.activeSegment = null;
		},
		
		render: function(path, container, caseSize, mazeTop, mazeLeft){
			
			segmentChanges = null;
			
			if(path.spaces.length == 1){
				// destroy the old path
				this.destroyPath();
				
				var position = path.spaces[0];
				
				this._beginSegment(position, caseSize, mazeTop, mazeLeft, container);
				
			} else {
			
				var direction = path.movements[path.movements.length - 1];
				
				if(direction == -1){
					// si tratta di una teleportata
					var position = path.spaces[path.spaces.length - 1];
					this._beginSegment(position, caseSize, mazeTop, mazeLeft, container);
					
				} else {
				
					// check if this is the very first step or a step that changes direction
					if(this.lastDirection != -1 && direction != this.lastDirection){
						var position = path.spaces[path.spaces.length - 2];
						this._beginSegment(position, caseSize, mazeTop, mazeLeft, container);
					}
				
					var isBackwardStep = direction == 0 || direction == 3;
					var isVerticalStep = direction == 0 || direction == 2;
					
					var firstValue = 0, secondValue = 0;
					segmentChanges = {};
					if(isVerticalStep){
						firstValue = caseSize; 
					} else {
						secondValue = caseSize;
					}
					
					if(isBackwardStep){
						segmentChanges['top'] = '-=' + firstValue + 'px';
						segmentChanges['left'] = '-=' + secondValue + 'px';
					}
					segmentChanges['height'] = '+=' + firstValue + 'px';
					segmentChanges['width'] = '+=' + secondValue + 'px';
					
					this.activeSegment.css(segmentChanges).attr('direction', direction);
					
					this.lastDirection = direction;
				}
			}
		},
		
		getSnapshot: function(){
			return {
				activeSegment: this.activeSegment,
				w: this.activeSegment.width(),
				h: this.activeSegment.height(),
				t: this.activeSegment.css('top'),
				l: this.activeSegment.css('left')
			}
		},
		
		performUndo: function(snapshot){
			snapshot.activeSegment.css({'width': snapshot.w, 'height': snapshot.h, 'left': snapshot.l, 'top': snapshot.t});
			if(!snapshot.activeSegment.hasClass('active')){
				snapshot.activeSegment.addClass('marked');
				
				var segment = this.segments.pop();
				while(segment && !segment.hasClass('marked')){
					segment.remove();
					segment = this.segments.pop();
				}
				
				this.segments.push(snapshot.activeSegment);
				this.activeSegment = snapshot.activeSegment.addClass('active').removeClass('marked');
				this.lastDirection = Number(snapshot.activeSegment.attr('direction'));
			}				
		},
		
		_beginSegment: function(position, caseSize, mazeTop, mazeLeft, container){
			
			// calculate the segment offset
			var segmentDimensions = {
				'top': mazeTop + (position[0] * caseSize) + (caseSize / 2) - (caseSize * this.startRadiusPercentage / 100),
				'left': mazeLeft + (position[1] * caseSize) + (caseSize / 2) - (caseSize * this.startRadiusPercentage / 100),
				'border-radius': 2 * caseSize * this.startRadiusPercentage / 100,
				'height': 2 * caseSize * this.startRadiusPercentage / 100,
				'width': 2 * caseSize * this.startRadiusPercentage / 100
			};
			
			// construct the segment
			var segment = $('<div class="absolutePosition path"></div>');
			
			// apply the css rules
			segment.css(this.css);
			segment.css(segmentDimensions);
			segment.addClass('active');
			
			// store the segment for future deletion
			this.segments.push(segment);
			
			if(this.activeSegment) this.activeSegment.removeClass('active');
			
			// store the newly created segment as the active segment 
			this.activeSegment = segment;
			
			// update the lastDirection
			this.lastDirection = -1;
			
			// append the segment to the container
			container.append(segment);
		}
	};
	
	return pathRenderer;
});