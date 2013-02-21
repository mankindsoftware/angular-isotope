angular.module('iso.config', []).value('iso.config', {});
angular.module('iso.filters', ['iso.config']);
angular.module('iso.directives', ['iso.config']);
angular.module('iso', ['iso.filters', 'iso.directives', 'iso.config']);

isotopeApp.controller('MainCtrl', function($scope, $timeout) {
	'use strict';

	var onLayoutEvent = "isotope.onLayout"
	, isotopeOptions = {}
	, postInitialized = false
	, isotopeContainer = null
	, buffer = []
	;
	
	$scope.$on(onLayoutEvent, function(event) {});

	isotopeOptions["onLayout"] = function($elems, instance) {
		$timeout(function() {
			$scope.$apply(function() {
				$scope.$emit(onLayoutEvent);
			});
		});
	};

	var initEventHandler = function(fun, evt, hnd) {
		if (evt) fun.call($scope, evt, hnd);
	};

	$scope.init = function(isoInit) {
		isotopeContainer = isoInit.element;
		initEventHandler($scope.$on, isoInit.isoOptionsEvent, optionsHandler);
		initEventHandler($scope.$on, isoInit.isoMethodEvent, methodHandler);

		$timeout(
				function() {
					isotopeContainer.isotope(isotopeOptions);
					postInitialized = true;
				}
		);
	};

	$scope.setIsoElement = function($element, mode) {
		if (postInitialized) {
			$timeout(function() {isotopeContainer.isotope("insert", $element);});
		}
	};

	$scope.refreshIso = function() {
		if (postInitialized) {
			isotopeContainer.isotope();
		}
	};
	
	$scope.updateOptions = function(option) {
		if (isotopeContainer) {
			isotopeContainer.isotope(option);
		} else {
			isotopeOptions = $.extend.apply( null, [true, isotopeOptions].concat(option) );
		}
	};
 
 // Event handling.
 var optionsHandler = function(event, option) {
		$scope.updateOptions(option);
	};

	var methodHandler = function(event, option) {
		var fun = option.fun;
		var params = option.params;
		fun.apply($scope, params);
	};
		
	initEventHandler($scope.$on, 'iso-opts', optionsHandler);
	initEventHandler($scope.$on, 'iso-method', methodHandler);

	// Not used here.
	$scope.removeAll = function() {
		isotopeContainer.isotope('remove',
			isotopeContainer.data('isotope').$allAtoms);
	};

	$scope.refresh = function() {
		isotopeContainer.isotope();
	};

});





 isotopeApp.controller('isoSortbyData', function($scope) {

  $scope.getHash = function(s) {
      return 'opt'+ s; // TODO: Replace non-key chars '.', '#', '[',']'
  };

  $scope.optSortData = function(item, index) {
      var elementSortData = {}
      , $item = $(item)
      , selector = $item.attr('opt-sel')
      , type = $item.attr('opt-type')
      , sortKey = $scope.getHash(selector)
      , fun = $item.attr('opt-convert') ? eval('[' + $item.attr('opt-convert') + ']')[0] : null
      , genSortDataClosure = function(selector, type, convert) {
          return function($elem) {
              return getValue(selector, $elem, type, convert);
          };
      }
      ;

      elementSortData[sortKey] = genSortDataClosure(selector, type, fun);
      return elementSortData;
    };

    $scope.createSortByDataMethods = function(elem) {
      var options=$(elem)
      , sortDataArray = reduce($.map(options, $scope.optSortData))
      ;
      return sortDataArray;
    };

    var reduce = function(list) {
      var reduction = {};
      $.each(list, function (index, item) {
        $.extend(reduction, item);
      });
      return reduction;
    };

    var getValue = function(selector, $elem, type, evaluate) {
      var getText = function($elem, item, selector) {
          if (!item.length) {
              return $elem.text();
          }
          var text = "";
          switch (selector.charAt(0)) {
              case '#': text = item.text();
              break;
              case '.': text = item.text();
              break;
              case '[': text = item.attr(selector.replace('[','').replace(']','').split()[0]);
              break;
          }
          return text;
      }
      , toType = function(text, type) {
          var utility = {
              text: function(s) {
                  return s.toString();
              }
              , integer: function(s) {
                  return parseInt(s, 10);
              }
              , float: function(s) {
                  return parseFloat(s);
              }
          };
          return utility[type] ? utility[type](text) : text;
      }
      , item = $elem.find(selector)
      , text = getText($elem, item, selector)
      , val = toType(text, type);
      return evaluate ? evaluate(val) : val;
    };
});

