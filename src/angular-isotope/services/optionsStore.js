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
