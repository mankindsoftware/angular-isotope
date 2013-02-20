
isotopeApp.controller('MainCtrl', function($scope, $timeout) {
	'use strict';

	var onLayoutEvent = "isotope.onLayout"
	, isotopeOptions = {}
	, postInitialized = false
	, isotopeContainer = null
	, buffer = []
	, setMode = "insert"
	;
	
	$scope.$on(onLayoutEvent, function(event) {});

	isotopeOptions["onLayout"] = function($elems, instance) {
		$timeout(function() {
			$scope.$apply(function() {
				$scope.$emit(onLayoutEvent);
			});
		});
	};

	$scope.init = function($container) {
		isotopeContainer = $container;
		setMode = $container.attr("iso-set");
		$timeout(
				function() {
					isotopeContainer.isotope(isotopeOptions);
					postInitialized = true;
				}
		);
	};

	$scope.removeAll = function() {
		isotopeContainer.isotope('remove',
			isotopeContainer.data('isotope').$allAtoms);
	};

	$scope.setIsoElement = function($element) {
		if (postInitialized) {
			$timeout(function() {insertIsoElement($element);});
		}
	};

	$scope.refreshIso = function() {
		if (postInitialized) {
			isotopeContainer.isotope();
		}
	};

	$scope.refresh = function() {
		isotopeContainer.isotope();
	};

	var insertIsoElement = function($element) {
		return isotopeContainer.isotope("insert", $element);
	};

	$scope.addIsoElement = function($element) {
		return isotopeContainer.isotope("addItems", $element);
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
	$scope.$on('method', function(event, option) {
		var fun = option.fun;
		var params = option.params;
		fun.apply(this, params);
	});
});




