angular.module('iso.directives')

.directive('isotopeContainer', ['$injector', function($injector) {
	'use strict';
	var options = {};
	return {
		link: function(scope,element,attrs) {
			var $element = $(element)
			, linkOptions = []
			;

			// If ui-options are passed, merge them onto global defaults.
			if (attrs.isotopeOptions) {
					linkOptions = scope.$eval('[' + attrs.isotopeOptions + ']');
					if (angular.isObject(linkOptions[0])) {
						scope.updateOptions(linkOptions[0]);
					}
			}

			scope.init($element);
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
			scope.setIsoElement($element);

			// Refresh after last element.
			if (attrs.ngRepeat && true === scope.$last) {
				element.ready(function () {
					scope.refreshIso();
				});
			}
			return element;
		}
	};
}]);

