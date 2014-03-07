angular.module("iso.services", ["iso.config"], [
  '$provide', function($provide) {
    return $provide.factory("optionsStore", [
      "iso.config", function(config) {
        "use strict";
        var storedOptions;
        storedOptions = config.defaultOptions || {};
        return {
          store: function(option) {
            storedOptions = $.extend.apply(null, [true, storedOptions].concat(option));
            return storedOptions;
          },
          retrieve: function() {
            return storedOptions;
          }
        };
      }
    ]);
  }
])
.value('iso.topics', {
  MSG_OPT:'ng_iso_msgopt',
  MSG_METH:'ng_iso_msgmet',
  MSG_REMOVE:'ng_iso_remel'
});
