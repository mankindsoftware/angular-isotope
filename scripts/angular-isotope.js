(function(window, document) {

// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('iso.config', [])
    .value('iso.config', {
        debug: true
    });

// Modules
angular.module('iso.directives', ['iso.services']);
angular.module('iso.services', []);
angular.module('iso',
    [
        'iso.config',
        'iso.directives',
        'iso.services'
    ]);


angular.module("iso.controllers", ["iso.config", "iso.services"])
.controller("angularIsotopeController", [
  "iso.config", "iso.topics", "$scope", "$timeout", "optionsStore", function(config, topics, $scope, $timeout, optionsStore) {
    "use strict";
    var buffer, initEventHandler, isoMode, isotopeContainer, methodHandler, onLayoutEvent, optionsHandler, postInitialized, scope;
    onLayoutEvent = "isotope.onLayout";
    postInitialized = false;
    isotopeContainer = null;
    buffer = [];
    scope = "";
    isoMode = "";
    $scope.$on(onLayoutEvent, function(event) {});
    $scope.layoutEventEmit = function($elems, instance) {
      return $timeout(function() {
        return $scope.$apply(function() {
          return $scope.$emit(onLayoutEvent);
        });
      });
    };
    optionsStore.store({
      onLayout: $scope.layoutEventEmit
    });
    initEventHandler = function(fun, evt, hnd) {
      if (evt) {
        return fun.call($scope, evt, hnd);
      }
    };
    $scope.delayInit = function(isoInit) {
      optionsStore.storeInit(isoInit);
    };
    $scope.delayedInit = function() {
      var isoInit = optionsStore.retrieveInit();
      $scope.init(isoInit);
    };

    $scope.$on('iso-init', function() {
      $scope.delayedInit();
    });
    $scope.init = function(isoInit) {
      optionsStore.storeInit(isoInit);
      isotopeContainer = isoInit.element;
      initEventHandler($scope.$on, isoInit.isoOptionsEvent || topics.MSG_OPTIONS, optionsHandler);
      initEventHandler($scope.$on, isoInit.isoMethodEvent || topics.MSG_METHOD, methodHandler);
      $scope.isoMode = isoInit.isoMode || "addItems";
      return $timeout(function() {
        var opts = optionsStore.retrieve();

        if (!(window.jQuery && isotopeContainer.isotope(opts)))
        {
            // create jqLite wrapper
            var instance = new Isotope(isotopeContainer[0], opts);

            isotopeContainer.isotope = function(options, callback) {
                var args = Array.prototype.slice.call( arguments, 1 );
                if ( typeof options === 'string' ) {
                    return(instance[options].apply(instance, args));
                } else {
                    instance.option( options );
                    instance._init( callback );
                }
           }
        }

        postInitialized = true;
      });
    };
    $scope.setIsoElement = function($element) {
      if (postInitialized) {
        return $timeout(function() {
          return isotopeContainer.isotope($scope.isoMode, $element);
        });
      }
    };
    $scope.refreshIso = function() {
      if (postInitialized) {
        return isotopeContainer.isotope();
      }
    };
    $scope.updateOptions = function(option) {
      if (isotopeContainer) {
        isotopeContainer.isotope(option);
      } else {
        optionsStore.store(option);
      }
    };
    $scope.updateMethod = function(name, params, cb) {
      return isotopeContainer.isotope(name, params, cb);
    };
    optionsHandler = function(event, option) {
      return $scope.updateOptions(option);
    };
    methodHandler = function(event, option) {
      var name, params;
      name = option.name;
      params = option.params;
      return $scope.updateMethod(name, params, null);
    };

    $scope.removeAll = function(cb) {
      return isotopeContainer.isotope("remove", isotopeContainer.data("isotope").$allAtoms, cb);
    };
    $scope.refresh = function() {
      return isotopeContainer.isotope();
    };
    $scope.$on(config.refreshEvent, function() {
      return $scope.refreshIso();
    });
    $scope.$on(topics.MSG_REMOVE, function(message, element) {
      return $scope.removeElement(element);
    });
    $scope.$on(topics.MSG_OPTIONS, function(message, options) {
      return optionsHandler(message, options);
    });
    $scope.$on(topics.MSG_METHOD, function(message, opt) {
      return methodHandler(message, opt);
    });
    $scope.removeElement = function(element) {
      return isotopeContainer && isotopeContainer.isotope("remove", element);
    };
  }
])
.controller("isoSortByDataController", [
  "iso.config", "$scope", "optionsStore", function(config, $scope, optionsStore) {
    var getValue, reduce;
    $scope.getHash = function(s) {
      return "opt" + s;
    };
    $scope.storeMethods = function(methods) {
      return optionsStore.store({
        getSortData: methods
      });
    };
    $scope.optSortData = function(index, item) {
      var $item, elementSortData, fun, genSortDataClosure, selector, sortKey, type;
      elementSortData = {};
      $item = angular.element(item);
      selector = $item.attr("ok-sel");
      type = $item.attr("ok-type");
      sortKey = $scope.getHash(selector);
      fun = ($item.attr("opt-convert") ? eval_("[" + $item.attr("opt-convert") + "]")[0] : null);
      genSortDataClosure = function(selector, type, convert) {
        return function($elem) {
          return getValue(selector, $elem, type, convert);
        };
      };
      elementSortData[sortKey] = genSortDataClosure(selector, type, fun);
      return elementSortData;
    };
    $scope.createSortByDataMethods = function(elem) {
      var options, sortDataArray;
      options = $(elem);
      sortDataArray = reduce(options.map($scope.optSortData));
      return sortDataArray;
    };
    reduce = function(list) {
      var reduction;
      reduction = {};
      angular.forEach(list, function(item, index) {
        return angular.extend(reduction, item);
      });
      return reduction;
    };
    getValue = function(selector, $elem, type, evaluate) {
      var getText, item, text, toType, val;
      getText = function($elem, item, selector) {
        var text;
        if (!item.length) {
          return $elem.text();
        }
        text = "";
        switch (selector.charAt(0)) {
          case "#":
            text = item.text();
            break;
          case ".":
            text = item.text();
            break;
          case "[":
            text = item.attr(selector.replace("[", "").replace("]", "").split()[0]);
        }
        return text;
      };
      toType = function(text, type) {
        var numCheck, utility;
        numCheck = function(val) {
          if (isNaN(val)) {
            return Number.POSITIVE_INFINITY;
          } else {
            return val;
          }
        };
        utility = {
          text: function(s) {
            return s.toString();
          },
          integer: function(s) {
            return numCheck(parseInt(s, 10));
          },
          float: function(s) {
            return numCheck(parseFloat(s));
          },
          boolean: function(s) {
            return "true" === s;
          }
        };
        if (utility[type]) {
          return utility[type](text);
        } else {
          return text;
        }
      };
      item = $elem.find(selector);
      text = getText($elem, item, selector);
      val = toType(text, type);
      if (evaluate) {
        return evaluate(val);
      } else {
        return val;
      }
    };
  }
]);
angular.module("iso.directives", ["iso.config", "iso.services", "iso.controllers"]);

angular.module("iso.directives")
.directive("isotopeContainer", ["$injector", "$parse", function($injector, $parse) {
    "use strict";
    var options;
    options = {};
    return {
      controller: "angularIsotopeController",
      link: function(scope, element, attrs) {
        var isoInit, isoOptions, linkOptions;
        linkOptions = [];
        isoOptions = attrs.isoOptions;
        isoInit = {};
        if (isoOptions) {
          linkOptions = $parse(isoOptions)(scope);
          if (angular.isObject(linkOptions)) {
            scope.updateOptions(linkOptions);
          }
        }
        isoInit.element = element;
        isoInit.isoOptionsEvent = attrs.isoOptionsSubscribe;
        isoInit.isoMethodEvent = attrs.isoMethodSubscribe;
        isoInit.isoMode = attrs.isoMode;
        if (attrs.isoUseInitEvent === "true") {
          scope.delayInit(isoInit);
        } else {
          scope.init(isoInit);
        }
        return element;
      }
    };
  }
])
.directive("isotopeItem", [
  "$rootScope", "iso.config", "iso.topics", "$timeout", function($rootScope, config, topics, $timeout) {
    return {
      restrict: "A",
      require: "^isotopeContainer",
      link: function(scope, element, attrs) {

        scope.setIsoElement(element);
        scope.$on('$destroy', function(message) {
          $rootScope.$broadcast(topics.MSG_REMOVE, element);
        });
        if (attrs.ngRepeat && true === scope.$last && "addItems" === scope.isoMode) {
          element.ready(function() {
            return $timeout((function() {
              return scope.refreshIso();
            }), config.refreshDelay || 0);
          });
        }
        if (!attrs.ngRepeat) {
          element.ready(function() {
            return $timeout((function() {
              return scope.refreshIso();
            }), config.refreshDelay || 0);
          });          
        }
        return element;
      }
    };
  }
])
.directive("isoSortbyData", function() {
    return {
      restrict: "A",
      controller: "isoSortByDataController",
      link: function(scope, element, attrs) {
        var methSet, methods, optEvent, optKey, optionSet, options;
        optionSet = angular.element(element);
        optKey = optionSet.attr("ok-key");
        optEvent = "iso-opts";
        options = {};
        methSet = optionSet.find("[ok-sel]");
        methSet.each(function(index) {
          var $this;
          $this = angular.element(this);
          return $this.attr("ok-sortby-key", scope.getHash($this.attr("ok-sel")));
        });
        methods = scope.createSortByDataMethods(methSet);
        return scope.storeMethods(methods);
      }
    };
  }
)
.directive("optKind", ['optionsStore', 'iso.topics', function(optionsStore, topics) {
  return {
    restrict: "A",
    controller: "isoSortByDataController",
    link: function(scope, element, attrs) {
      var createSortByDataMethods, createOptions, doOption, emitOption, optKey, optPublish, methPublish, optionSet, determineAciveClass, activeClass, activeSelector, active;
      optionSet = $(element);
      optPublish = attrs.okPublish || attrs.okOptionsPublish || topics.MSG_OPTIONS;
      methPublish = attrs.okMethodPublish || topics.MSG_METHOD;
      optKey = optionSet.attr("ok-key");

      determineActiveClass = function() {
        activeClass = attrs.okActiveClass;
        if (!activeClass) {
          activeClass = optionSet.find(".selected").length ? "selected" : "active";
        }
        activeSelector = "." + activeClass;
        active = optionSet.find(activeSelector);
      };

      createSortByDataMethods = function(optionSet) {
        var methSet, methods, optKey, options;
        optKey = optionSet.attr("ok-key");
        if (optKey !== "sortBy") {
          return;
        }
        options = {};
        methSet = optionSet.find("[ok-sel]");
        methSet.each(function(index) {
          var $this;
          $this = angular.element(this);
          return $this.attr("ok-sortby-key", scope.getHash($this.attr("ok-sel")));
        });
        methods = scope.createSortByDataMethods(methSet);
        return scope.storeMethods(methods);
      };

      createOptions = function(item) {
        var ascAttr, key, option, virtualSortByKey;
        if (item) {
          option = {};
          virtualSortByKey = item.attr("ok-sortby-key");
          ascAttr = item.attr("opt-ascending");
          key = virtualSortByKey || item.attr("ok-sel");
          if (virtualSortByKey) {
            option.sortAscending = (ascAttr ? ascAttr === "true" : true);
          }
          option[optKey] = key;
          return option;
        }
      };

      emitOption = function(option) {
        optionsStore.store(option);
        return scope.$emit(optPublish, option);
      };

      doOption = function(event) {
        var selItem;
        event.preventDefault();
        selItem = angular.element(event.target);
        if (selItem.hasClass(activeClass)) {
          return false;
        }
        optionSet.find(activeSelector).removeClass(activeClass);
        selItem.addClass(activeClass);
        emitOption(createOptions(selItem));
        return false;
      };

      determineActiveClass();
      
      createSortByDataMethods(optionSet);

      if (active.length) {
        var opts = createOptions(active);
        optionsStore.store(opts);
      }

      return optionSet.on("click", function(event) {
        return doOption(event);
      });
    }
  };
}]);
angular.module("iso.services", ["iso.config"], [
  '$provide', function($provide) {
    return $provide.factory("optionsStore", [
      "iso.config", function(config) {
        "use strict";
        var storedOptions, delayedInit;
        storedOptions = config.defaultOptions || {};
        return {
          store: function(option) {
            angular.extend(storedOptions, option);
            return storedOptions;
          },
          retrieve: function() {
            return storedOptions;
          },
          storeInit: function(init) {
            delayedInit = init;
          },
          retrieveInit: function() {
            return delayedInit;
          }
        };
      }
    ]);
  }
])
.value('iso.topics', {
  MSG_OPTIONS:'iso-option',
  MSG_METHOD:'iso-method',
  MSG_REMOVE:'iso-remove'
});
})(window, document);