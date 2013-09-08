angular.module('angular-isotope.directives')

.directive('isoSortbyData', function(optionsStore) {
  return {
    restrict: 'A'
    , controller: isoSortByDataController
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optKey = optionSet.attr('opt-key')
      , optEvent = "iso-opts" // Not attr('opt-publish'), as this may not be instantiated.
      , options = {}
      , methSet = optionSet.children().find("[opt-sel]")
      ;
        // Create alternate selector values
        methSet.each(function(index) {
          var $this = $(this);
          $this.attr("opt-sortby-key", scope.getHash($this.attr("opt-sel")));
        });

        // Create sort data table, mapping selector to how value is returned for comparison
        var methods = scope.createSortByDataMethods(methSet);
        scope.storeMethods(methods);
      }
    };
  });

