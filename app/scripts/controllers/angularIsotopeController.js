
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
		if (!postInitialized) { return; }
		$timeout(function(setMode) {
			switch (setMode) {
				case 'add':
					$scope.addIsoElement($element);
					break;
				case 'insert':
					$scope.insertIsoElement($element);
					break;
				case 'buffer':
					buffer.push($element.valueOf());
					break;
				default:
					$timeout(function() {$scope.insertIsoElement($element);});
			}
		});
	};

	$scope.refreshIso = function() {
		if (!postInitialized) { return; }
		if (buffer.length) {
				$scope.addIsoElement(buffer);
				buffer = [];
		}
		isotopeContainer.isotope();
	};

	$scope.refresh = function() {
		isotopeContainer.isotope();
	};

	$scope.insertIsoElement = function($element) {
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
	$scope.$on('opt.sortByMethods', function(event, option) {
		$scope.updateOptions(option);
	});
	$scope.$on('method', function(event, option) {
		$scope.updateOptions(option);
	});
});




