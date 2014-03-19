angular.module("iso.services", ["iso.config"], [
  '$provide', function($provide) {
    return $provide.factory("optionsStore", [
      "iso.config", function(config) {
        "use strict";
        var storedOptions, delayedInit;
        storedOptions = config.defaultOptions || {};
        return {
          store: function(option) {
            storedOptions = $.extend.apply(null, [true, storedOptions].concat(option));
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
