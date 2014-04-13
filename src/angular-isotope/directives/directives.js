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
        optionSet = $(element);
        optKey = optionSet.attr("ok-key");
        optEvent = "iso-opts";
        options = {};
        methSet = optionSet.find("[ok-sel]");
        methSet.each(function(index) {
          var $this;
          $this = $(this);
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
          $this = $(this);
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
        selItem = $(event.target);
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