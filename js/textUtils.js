define(function() {

	return function($el, content){
		var maxH = $el.height();
		var maxW = $el.width();
	
		var $span = $('<span style="width: ' + maxW + 'px; display: inline-block">' + content + '</span>');
		
		$el.append($span);
		
		var fontMin = 1;
		var fontMax = 0;
		var actualFont = 60;
		var foundMax = false;

		var maxCycle = 1000;
		while(fontMax === 0 && maxCycle > 0) {
			maxCycle --;
			$span.css('font-size', actualFont + 'px');
			
			var h = $span.height();

			if(h > maxH) {
				fontMax = actualFont;
			}
			
			actualFont ++;
		}
		
		actualFont = fontMax;
		while(actualFont > fontMin){
			
			$span.css('font-size', actualFont + 'px');
			
			var h = $span.height();
			
			if(h <= maxH) break;
			
			actualFont--;
		}
		
		$span.css('width', 'auto');
		var w = $span.width();
		
		if(w > maxW) {
			actualFont --;
			while(actualFont > fontMin){
			
				$span.css('font-size', actualFont + 'px');
				
				var w = $span.width();
				
				if(w <= maxW) break;
				
				actualFont--;
			}
		}
		$el.css('font-size', actualFont + 'px').html(content);
	};
});