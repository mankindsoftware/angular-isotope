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
        isotopeContainer.isotope(opts);
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
    $scope.optSortData = function(item, index) {
      var $item, elementSortData, fun, genSortDataClosure, selector, sortKey, type;
      elementSortData = {};
      $item = $(item);
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
      sortDataArray = reduce($.map(options, $scope.optSortData));
      return sortDataArray;
    };
    reduce = function(list) {
      var reduction;
      reduction = {};
      $.each(list, function(index, item) {
        return $.extend(reduction, item);
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
