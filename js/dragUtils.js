define(['getStyleProperty', 'eventie', 'getSize'], function(getStyleProperty, eventie, getSize){
	// vars
	var document = window.document;

	// -------------------------- support -------------------------- //

	var transformProperty = getStyleProperty('transform');
	var transitionProperty = getStyleProperty('transition');
	
	// TODO fix quick & dirty check for 3D support
	var is3d = !!getStyleProperty('perspective');

	// --------------------------  -------------------------- //
	
	// -------------------------- helpers -------------------------- //

	// extend objects
	function extend( a, b ) {
		for ( var prop in b ) {
			a[ prop ] = b[ prop ];
		}
		return a;
	}

	function noop() {}

	// ----- get style ----- //

	var defView = document.defaultView;

	var getStyle = defView && defView.getComputedStyle ?
	function( elem ) {
		return defView.getComputedStyle( elem, null );
	} :
	function( elem ) {
		return elem.currentStyle;
	};


	// http://stackoverflow.com/a/384380/182183
	var isElement = ( typeof HTMLElement === 'object' ) ?
	function isElementDOM2( obj ) {
		return obj instanceof HTMLElement;
	} :
	function isElementQuirky( obj ) {
		return obj && typeof obj === 'object' &&
		obj.nodeType === 1 && typeof obj.nodeName === 'string';
	};
	
	// -------------------------- requestAnimationFrame -------------------------- //

	// https://gist.github.com/1866474

	var lastTime = 0;
	var prefixes = 'webkit moz ms o'.split(' ');
	// get unprefixed rAF and cAF, if present
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame = window.cancelAnimationFrame;
	// loop through vendor prefixes and get prefixed rAF and cAF
	var prefix;
	for( var i = 0; i < prefixes.length; i++ ) {
		if ( requestAnimationFrame && cancelAnimationFrame ) {
			break;
		}
		prefix = prefixes[i];
		requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
		cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
	}

	// fallback to setTimeout and clearTimeout if either request/cancel is not supported
	if ( !requestAnimationFrame || !cancelAnimationFrame )  {
		requestAnimationFrame = function( callback ) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
			var id = window.setTimeout( function() {
				callback( currTime + timeToCall );
			}, timeToCall );
			lastTime = currTime + timeToCall;
			return id;
		};

		cancelAnimationFrame = function( id ) {
			window.clearTimeout( id );
		};
	}
	
	
	
	function Drag( element, options ) {
		this.element = element;
		this.options = {};
		extend( this.options, options );

		this._create();
	}
	
	Drag.prototype._create = function() {

		// properties
		this.position = {};
		this.translation = {};
		
		this._getPosition();
		this._getTranslation();

		this.startPoint = { x: 0, y: 0 };
		this.dragPoint = { x: 0, y: 0 };
		
		this.startPosition = extend( {}, this.position );
		this.startTranslation = extend( {}, this.translation );
		
		this.animateDragPoint = { x: this.startTranslation.x, y: this.startTranslation.y };

		this.enable();
		this.setHandles();

	};
		
	// get left/top position from style
	Drag.prototype._getPosition = function() {
	    // properties
	    var style = getStyle( this.element );

	    var x = parseInt( style.left, 10 );
	    var y = parseInt( style.top, 10 );

	    // clean up 'auto' or other non-integer values
	    this.position.x = isNaN( x ) ? 0 : x;
	    this.position.y = isNaN( y ) ? 0 : y;

	};
	
	// get transform: translate( x, y ) from style
	Drag.prototype._getTranslation = function() {
	
		var style = getStyle( this.element );
	
		if ( !transformProperty ) {
			return;
		}
		var transform = style[ transformProperty ];
		// bail out if value is 'none'
		var translateX = 0;
		var translateY = 0;
		if ( transform.indexOf('matrix') === 0 ) {
			
			// split matrix(1, 0, 0, 1, x, y)
			var matrixValues = transform.split(',');
			// translate X value is in 12th or 4th position
			var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
			translateX = parseInt( matrixValues[ xIndex ], 10 );
			// translate Y value is in 13th or 5th position
			translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
		
			// clean up 'auto' or other non-integer values
			translateX = isNaN( translateX ) ? 0 : translateX;
			translateY = isNaN( translateY ) ? 0 : translateY;
		}
		
		this.translation.x = translateX;
		this.translation.y = translateY;
	};
	
	/**
	 * set this.handles and bind start events to 'em
	 */
	Drag.prototype.setHandles = function() {
		this.handles = [ this.element ];

		var handle = this.element;
		// bind pointer start event
		if ( window.navigator.pointerEnabled ) {
			// W3C Pointer Events, IE11. See https://coderwall.com/p/mfreca
			eventie.bind( handle, 'pointerdown', this );
			// disable scrolling on the element
			handle.style.touchAction = 'none';
		} else if ( window.navigator.msPointerEnabled ) {
			// IE10 Pointer Events
			eventie.bind( handle, 'MSPointerDown', this );
			// disable scrolling on the element
			handle.style.msTouchAction = 'none';
		} else {
			// listen for both, for devices like Chrome Pixel
			//   which has touch and mouse events
			eventie.bind( handle, 'mousedown', this );
			eventie.bind( handle, 'touchstart', this );
		}
	}

	// -------------------------- events -------------------------- //

	// trigger handler methods for events
	Drag.prototype.handleEvent = function( event ) {
		var method = 'on' + event.type;
		if ( this[ method ] ) {
			this[ method ]( event );
		}
	};
	
	// returns the touch that we're keeping track of
	Drag.prototype.getTouch = function( touches ) {
	  for ( var i=0, len = touches.length; i < len; i++ ) {
	    var touch = touches[i];
	    if ( touch.identifier === this.pointerIdentifier ) {
	      return touch;
	    }
	  }
	};
	
	// ----- start event ----- //

	Drag.prototype.onmousedown = function( event ) {
		// dismiss clicks from right or middle buttons
		var button = event.button;
		if ( button && ( button !== 0 && button !== 1 ) ) {
			return;
		}
		this.dragStart( event, event );
	};

	Drag.prototype.ontouchstart = function( event ) {
		// disregard additional touches
		if ( this.isDragging ) {
			return;
		}

		this.dragStart( event, event.changedTouches[0] );
	};

	Drag.prototype.onMSPointerDown =
	Drag.prototype.onpointerdown = function( event ) {
		// disregard additional touches
		if ( this.isDragging ) {
			return;
		}

		this.dragStart( event, event );
	};
	
	function setPointerPoint( point, pointer ) {
		point.x = pointer.pageX !== undefined ? pointer.pageX : pointer.clientX;
		point.y = pointer.pageY !== undefined ? pointer.pageY : pointer.clientY;
	}
	
	// hash of events to be bound after start event
	var postStartEvents = {
		mousedown: [ 'mousemove', 'mouseup' ],
		touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
		pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
		MSPointerDown: [ 'MSPointerMove', 'MSPointerUp', 'MSPointerCancel' ]
	};
	
	/**
	* drag start
	* @param {Event} event
	* @param {Event or Touch} pointer
	*/
	Drag.prototype.dragStart = function( event, pointer ) {
		if ( !this.isEnabled ) {
			return;
		}

		if ( event.preventDefault ) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}

		// save pointer identifier to match up touch events
		this.pointerIdentifier = pointer.pointerId !== undefined ?
		// pointerId for pointer events, touch.indentifier for touch events
		pointer.pointerId : pointer.identifier;
		
		this._getPosition();
		this._getTranslation();
		
		this.measureContainment();

		// point where drag began
		setPointerPoint( this.startPoint, pointer );
		// position _when_ drag began
		this.startPosition.x = this.position.x;
		this.startPosition.y = this.position.y;
		
		this.startTranslation.x = this.translation.x;
		this.startTranslation.y = this.translation.y;

		this.dragPoint.x = 0;
		this.dragPoint.y = 0;
		
		this.animateDragPoint.x = this.startTranslation.x;
		this.animateDragPoint.y = this.startTranslation.y;
		
		// bind move and end events
		this._bindEvents({
			// get proper events to match start event
			events: postStartEvents[ event.type ],
			// IE8 needs to be bound to document
			node: event.preventDefault ? window : document
		});

		// reset isDragging flag
		this.isDragging = true;

		this.element.style[ transitionProperty ] = 'z-index 50ms ease';
		
		// start animation
		this.animate();
	};
	
	Drag.prototype._bindEvents = function( args ) {
		for ( var i=0, len = args.events.length; i < len; i++ ) {
			var event = args.events[i];
			eventie.bind( args.node, event, this );
		}
		// save these arguments
		this._boundEvents = args;
	};
	
	Drag.prototype._unbindEvents = function() {
		var args = this._boundEvents;
		// IE8 can trigger dragEnd twice, check for _boundEvents
		if ( !args || !args.events ) {
			return;
		}

		for ( var i=0, len = args.events.length; i < len; i++ ) {
			var event = args.events[i];
			eventie.unbind( args.node, event, this );
		}
		delete this._boundEvents;
	};
	
	Drag.prototype.measureContainment = function() {
		var containment = this.options.containment;
		if ( !containment ) {
			return;
		}

		this.size = getSize( this.element );
		var elemRect = this.element.getBoundingClientRect();

		// use element if element
		var container = isElement( containment ) ? containment :
		// fallback to querySelector if string
		typeof containment === 'string' ? document.querySelector( containment ) :
		// otherwise just `true`, use the parent
		this.element.parentNode;

		this.containerSize = getSize( container );
		var containerRect = container.getBoundingClientRect();

		this.relativeStartPosition = {
			x: elemRect.left - containerRect.left,
			y: elemRect.top  - containerRect.top
		};
	};
	
	// ----- move event ----- //

	Drag.prototype.onmousemove = function( event ) {
		this.dragMove( event, event );
	};

	Drag.prototype.onMSPointerMove =
	Drag.prototype.onpointermove = function( event ) {
		if ( event.pointerId === this.pointerIdentifier ) {
			this.dragMove( event, event );
		}
	};

	Drag.prototype.ontouchmove = function( event ) {
		var touch = this.getTouch( event.changedTouches );
		if ( touch ) {
			this.dragMove( event, touch );
		}
	};

	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	Drag.prototype.dragMove = function( event, pointer ) {

	    setPointerPoint( this.dragPoint, pointer );
		
	    var dragX = this.dragPoint.x - this.startPoint.x;
	    var dragY = this.dragPoint.y - this.startPoint.y;

	    dragX = this.containDrag( 'x', dragX );
	    dragY = this.containDrag( 'y', dragY );

	    this.animateDragPoint.x = this.startTranslation.x + dragX;
	    this.animateDragPoint.y = this.startTranslation.y + dragY;
	};
	
	Drag.prototype.containDrag = function( axis, drag ) {
		if ( !this.options.containment ) {
			return drag;
		}
		var measure = axis === 'x' ? 'width' : 'height';

		var rel = this.relativeStartPosition[ axis ];
		var min = -rel;
		var max = this.containerSize[ measure ] - rel - this.size[ measure ];
		return  Math.min( max, Math.max( min, drag ) );
	};
	
	// ----- end event ----- //

	Drag.prototype.onmouseup = function( event ) {
		this.dragEnd( event, event );
	};

	Drag.prototype.onMSPointerUp =
	Drag.prototype.onpointerup = function( event ) {
		if ( event.pointerId === this.pointerIdentifier ) {
			this.dragEnd( event, event );
		}
	};

	Drag.prototype.ontouchend = function( event ) {
		var touch = this.getTouch( event.changedTouches );
		if ( touch ) {
			this.dragEnd( event, touch );
		}
	};

	/**
	* drag end
	* @param {Event} event
	* @param {Event or Touch} pointer
	*/
	Drag.prototype.dragEnd = function( event, pointer ) {
		this.isDragging = false;

		delete this.pointerIdentifier;

		// remove events
		this._unbindEvents();

		this.options.onDragEnd && this.options.onDragEnd(this, event, pointer);

	};

	
	// -------------------------- animation -------------------------- //

	Drag.prototype.animate = function() {
		// only render and animate if dragging
		if ( !this.isDragging ) {
			return;
		}

		this.positionDrag();

		var _this = this;
		requestAnimationFrame( function animateFrame() {
			_this.animate();
		});

	};
	
	// transform translate function
	var translate = is3d ?
	function( x, y ) {
		return 'translate3d( ' + x + 'px, ' + y + 'px, 0)';
	} :
	function( x, y ) {
		return 'translate( ' + x + 'px, ' + y + 'px)';
	};
	
	Drag.prototype.positionDrag = function() {
		// position with transform
		this.element.style[ transformProperty ] = translate( this.animateDragPoint.x, this.animateDragPoint.y );
	};
	
	
	Drag.prototype.enable = function() {
		this.isEnabled = true;
	};
	
	Drag.prototype.disable = function() {
		this.isEnabled = false;
		if ( this.isDragging ) {
			this.dragEnd();
		}
	};

	
	return Drag;
});