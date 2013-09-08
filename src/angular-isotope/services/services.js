angular.module("iso.services", ["iso.config"], [
  '$provide', function($provide) {
    return $provide.factory("optionsStore", [
      "iso.config", function(config) {
        "use strict";
        var storedOptions;
        storedOptions = config.defaultOptions || {};
        return {
          store: function(option) {
            return storedOptions = $.extend.apply(null, [true, storedOptions].concat(option));
          },
          retrieve: function() {
            return storedOptions;
          }
        };
      }
    ]);
  }
]);
