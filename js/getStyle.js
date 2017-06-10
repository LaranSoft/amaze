define(function(){

	var defView = document.defaultView;

	var getStyle = defView && defView.getComputedStyle ?
		function( elem ) {
			return defView.getComputedStyle( elem, null );
		} :
		function( elem ) {
			return elem.currentStyle;
		};

	return getStyle;
});