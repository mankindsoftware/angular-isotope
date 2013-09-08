isotopeApp = angular.module("isotopeApp", ["iso.directives"])
isotopeApp.config(["$routeProvider", ($routeProvider) ->
  "use strict"
  $routeProvider.when("/",
    templateUrl: "views/main.html"
  ).otherwise redirectTo: "/"
])
