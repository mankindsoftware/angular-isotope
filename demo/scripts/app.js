 var demo = angular.module('angular-isotope-demo', ['angular-isotope.directives']);

demo.config(['$routeProvider', function($routeProvider) {
  'use strict';

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
