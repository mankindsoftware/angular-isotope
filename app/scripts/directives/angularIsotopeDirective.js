angular.module('iso.directives')

.directive('isotopeContainer', ['$injector', function($injector) {
	'use strict';
	var options = {};
	return {
		link: function(scope,element,attrs) {
			var $element = $(element);
			var linkOptions = [];
			
			// If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
	      	// if (attrs.isotopeOptions) {
	       //  	linkOptions = scope.$eval('[' + attrs.isotopeOptions + ']');
	       //  	if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
	       //    		linkOptions[0] = angular.extend({}, options, linkOptions[0]);
	       //  	}
	      	// } 

			// $element.addClass(linkOptions[0].containerClass);
			scope.init($element, linkOptions[0]);
			return element;
		}
	};
}]);

angular.module('iso.directives')
.directive('isotopeItem', ['$timeout', function($timeout) {
	return {
		restrict: 'A',

		link: function(scope,element,attrs) {
			var $element = $(element);
			//$element.addClass(scope.isotopeOptions.itemClass);
			scope.addIsoElement($element);

			// Refresh after last element.
			if (scope.$last == true) {
				element.ready(function () {
					//console.log("refresh")
					scope.refreshIsoOptions();
				});
			}
			return element;
		}
	};
}]);

