(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('angular-isotope.config', [])
    .value('angular-isotope.config', {
        debug: true
    });

// Modules
angular.module('angular-isotope.directives', ['angular-isotope.services']);
angular.module('angular-isotope.services', []);
angular.module('angular-isotope',
    [
        'angular-isotope.config',
        'angular-isotope.directives',
        'angular-isotope.services'
    ]);


var angularIsotopeController = function($scope, $timeout, optionsStore) {
	'use strict';

	var onLayoutEvent = "isotope.onLayout"
	, postInitialized = false
	, isotopeContainer = null
	, buffer = []
	, scope = ""
	, isoMode = ""
	;

	$scope.$on(onLayoutEvent, function(event) {});

	$scope.layoutEventEmit = function($elems, instance) {
		$timeout(function() {
			$scope.$apply(function() {
				$scope.$emit(onLayoutEvent);
			});
		});
	};

	optionsStore.store({onLayout: $scope.layoutEventEmit});

	var initEventHandler = function(fun, evt, hnd) {
		if (evt) fun.call($scope, evt, hnd);
	};

	$scope.init = function(isoInit) {
		isotopeContainer = isoInit.element;
		initEventHandler($scope.$on, isoInit.isoOptionsEvent, optionsHandler);
		initEventHandler($scope.$on, isoInit.isoMethodEvent, methodHandler);
		$scope.isoMode = isoInit.isoMode || "addItems";

		$timeout(
				function() {
					isotopeContainer.isotope(optionsStore.retrieve());
					postInitialized = true;
				}
		);
	};


	$scope.setIsoElement = function($element) {
		if (postInitialized) {
			$timeout(function() {isotopeContainer.isotope($scope.isoMode, $element);});
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
			optionsStore.store(option);
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

	// Defaults
	initEventHandler($scope.$on, 'iso-opts', optionsHandler);
	initEventHandler($scope.$on, 'iso-method', methodHandler);

	// Not used here.
	$scope.removeAll = function(cb) {
		isotopeContainer.isotope('remove',
			isotopeContainer.data('isotope').$allAtoms,cb);
	};

	$scope.refresh = function() {
		isotopeContainer.isotope();
	};

};




var isoSortByDataController = function($scope, optionsStore) {
  'use strict';

  $scope.getHash = function(s) {
      return 'opt'+ s; // TODO: Replace non-key chars '.', '#', '[',']'
  };

  $scope.storeMethods = function(methods) {
    optionsStore.store({getSortData: methods});
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
    }

    , getValue = function(selector, $elem, type, evaluate) {
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
          var numCheck = function(val) {
            return isNaN(val) ? Number.POSITIVE_INFINITY : val;
          }
          , utility = {
              text: function(s) {
                  return s.toString();
              }
              , integer: function(s) {
                  return numCheck(parseInt(s, 10));
              }
              , float: function(s) {
                  return numCheck(parseFloat(s));
              }
              , boolean: function(s) {
                  return 'true' === s;
              }
          };
          return utility[type] ? utility[type](text) : text;
      }
      , item = $elem.find(selector)
      , text = getText($elem, item, selector)
      , val = toType(text, type);
      return evaluate ? evaluate(val) : val;
    };
};

angular.module('angular-isotope.directives')
.directive('isotopeContainer', ['$injector', function($injector) {
	'use strict';
	var options = {};
	return {
		controller: angularIsotopeController,
		link: function(scope,element,attrs) {
			var linkOptions = []
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

			isoInit['element'] = element;
			isoInit['isoOptionsEvent'] = attrs.isoOptionsSubscribe;
			isoInit['isoMethodEvent'] = attrs.isoMethodSubscribe;
			isoInit['isoMode'] = attrs.isoMode;

			scope.init(isoInit);
			return element;
		}
	};
}]);

angular.module('angular-isotope.directives')

.directive('isotopeItem', ['$timeout', function($timeout) {
	return {
		restrict: 'A',

		link: function(scope,element,attrs) {
			var $element = $(element);

			//$element.addClass(scope.isotopeOptions.itemClass);
			scope.setIsoElement($element);

			// Refresh after last element.
			if (attrs.ngRepeat && true === scope.$last && "addItems" == scope.isoMode) {
				element.ready(function () {
					$timeout(function() {scope.refreshIso()});
				});
			}
			return element;
		}
	};
}]);

angular.module('angular-isotope.directives')
.directive('isoSortbyData', function(optionsStore) {
  return {
    restrict: 'A'
    , controller: isoSortByDataController
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optKey = optionSet.attr('opt-key')
      , optEvent = "iso-opts" // Not attr('opt-publish'), as this may not be instantiated.
      , options = {}
      , methSet = optionSet.children().find("[opt-sel]")
      ;
        // Create alternate selector values
        methSet.each(function(index) {
          var $this = $(this);
          $this.attr("opt-sortby-key", scope.getHash($this.attr("opt-sel")));
        });

        // Create sort data table, mapping selector to how value is returned for comparison
        var methods = scope.createSortByDataMethods(methSet);
        scope.storeMethods(methods);
      }
    };
  });

angular.module('angular-isotope.directives')
.directive('optKind', function(){
  return {
    restrict: 'A'
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optPublish = attrs.optPublish || "opt-kind-opt"
      , optKey = optionSet.attr('opt-key')
      , selected = optionSet.find('.selected')
      , preSelectOptions = {}
      ;

      // Emit dynamically made option object, e.g. {filter:'.my-filter-class'}
      var createOptions = function(item) {
        if (item) {
          var option = {}
          , virtualSortByKey = item.attr('opt-sortby-key')
          , ascAttr = item.attr('opt-ascending')
          , key = virtualSortByKey || item.attr('opt-sel')
          ;
          if (virtualSortByKey) {
            option['sortAscending'] = ascAttr ?  ascAttr === 'true' : true;
          }
          option[optKey] = key;

          return option;
        }
      }
      , emitOption = function(option) {
        scope.preSelectOptions = $.extend.apply( null, [true, scope.preSelectOptions].concat(option) );
        option['ok'] = scope.preSelectOptions;
        scope.$emit(optPublish, option);
      }
      , doOption = function(event) {
        event.preventDefault();

        var selItem = $(event.target);

        // don't proceed if already selected
        if ( selItem.hasClass('selected') ) {
          return false;
        }

        optionSet.find('.selected').removeClass('selected');
        selItem.addClass('selected');

        emitOption(createOptions(selItem));

        return false;
      }
      ;

      // Initialize to selected values
      if (selected.length) {
        scope.preSelectOptions = createOptions(selected);
      }

      // Delegate click
      optionSet.on('click', function(event) {
        doOption(event);
      });
    }
  };
});
angular.module('angular-isotope.services', [], function($provide) {
  $provide.factory('optionsStore', function() {
    'use strict';

    var storedOptions = {};

    return {
      store: function(option) {
        storedOptions = $.extend.apply( null, [true, storedOptions].concat(option) );
      }
      , retrieve: function() {
        return storedOptions;
      }
    };
  });
});
})(window, document);