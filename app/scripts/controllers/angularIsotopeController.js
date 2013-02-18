
isotopeApp.controller('MainCtrl', function($scope, $timeout) {
	'use strict';

	var onLayoutEvent = "isotope.onLayout"
	, isotopeOptions = {}
	, initialized = false
	, isotopeContainer = null
	;
	
	isotopeOptions["onLayout"] = function($elems, instance) {
				$scope.$apply($timeout(function() {
					$scope.$emit(onLayoutEvent);
				}));
			};

	$scope.init = function($container) {
		isotopeContainer = $container;

		if (false === initialized) {

			$timeout(function() {
				$scope.$apply( isotopeContainer.isotope(isotopeOptions))
			});
			return true;
		}
	};

	$scope.$on(onLayoutEvent, function(event) {});

	$scope.setIsoOptions = function(myoptions) {
		//console.log("setIsoOptions !!!");
		isotopeOptions = myoptions;
		isotopeContainer
		// .isotope(options[0].isotopeOptions) // For a refresh
		.isotope('reloadItems').isotope(myoptions);
		//$(document.documentElement).find('.lazyload').trigger("mkLazyLoadAll"); // TODO. Have rootScope broadcast this
	};

	$scope.removeAll = function() {
		isotopeContainer.isotope('remove', 
			isotopeContainer.data('isotope').$allAtoms);
	};

	$scope.insertIsoElement = function($element) {
		if (!initialized) { return; }
		return isotopeContainer.isotope("insert", $element);
	};

	$scope.addIsoElement = function($element) {
		if (!initialized) { return; }
		return isotopeContainer.isotope("addItems", $element);
	};

	$scope.refreshIsoOptions = function() {
			// myScope.isotopeContainer.isotope(isotopeOptions);
	};
	
	$scope.updateOptions = function(option) {
		if (isotopeContainer) {
			isotopeContainer.isotope(option);
		} else {
			isotopeOptions = $.extend.apply( null, [true, isotopeOptions].concat(option) );
		}
	};
 
	$scope.$on('opt', function(event, option) {
		$scope.updateOptions(option);
	});
	$scope.$on('opt.sortByMethods', function(event, option) {
		$scope.updateOptions(option);
	});
	$scope.$on('method', function(event, option) {
		$scope.updateOptions(option);
	});
})




