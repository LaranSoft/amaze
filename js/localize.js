define(['getStyle', 'support'], function(getStyle, support){
	
	return function(elem){
		var style = getStyle( elem );
		
		var transform = style[ support.transformProperty ];
		
		var translateX = 0;
		var translateY = 0;
		
		// bail out if value is 'none'
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
		
		return {
			x: translateX,
			y: translateY,
			left: parseInt(style['left'], 10),
			top: parseInt(style['top'], 10)
		};
	}
});