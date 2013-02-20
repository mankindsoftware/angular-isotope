angular.module('iso.directives')

.directive('isotopeContainer', ['$injector', function($injector) {
	'use strict';
	var options = {};
	return {
		link: function(scope,element,attrs) {
			var $element = $(element)
			, linkOptions = []
			, isoOptions = attrs.isoOptions
			, isoInit = {}
			;

			// If ui-options are passed, merge them onto global defaults.
			if (isoOptions) {
					linkOptions = scope.$eval('[' + isoOptions + ']');
					if (angular.isObject(linkOptions[0])) {
						scope.updateOptions(linkOptions[0]);
					}
			}

			isoInit['element'] = $element;
			isoInit['isoOptionsEvent'] = attrs.isoOptionsSubscribe;
			isoInit['isoMethodEvent'] = attrs.isoMethodSubscribe;

			scope.init(isoInit);
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

