app.directive("ngxStickyFooter", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			var arr = attrs.ngxStickyFooter.split(" ");
			var body = arr[0];
			var footer = arr[1];
			if (!body) body = angular.element(document.querySelector("body").firstElementChild);
			if (!footer) footer = angular.element(document.querySelector("footer"));
			if (body && footer) {
				var footerHeight = footer[0].offsetHeight;
				body.css({
					"padding-bottom": footerHeight + 'px',
					"margin-bottom": -footerHeight + 'px'
				});
			}
		}
	};
});