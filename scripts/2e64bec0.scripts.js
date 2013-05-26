 var isotopeApp = angular.module('isotopeApp', ['iso.directives']);

isotopeApp.config(['$routeProvider', function($routeProvider) {
  'use strict';

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);
angular.module('iso.config', []).value('iso.config', {});
angular.module('iso.filters', ['iso.config']);
angular.module('iso.services', ['iso.config']);
angular.module('iso.directives', ['iso.config', 'iso.services']);
angular.module('iso', ['iso.filters', 'iso.services', 'iso.directives', 'iso.config']);