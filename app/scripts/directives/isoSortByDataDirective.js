angular.module('iso.directives')

.directive('isoSortbyData', function(optionsStore) {
  return {
    restrict: 'A'
    , controller: isoSortByDataController
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optKey = optionSet.attr('ok-key')
      , optEvent = "iso-opts" // Not attr('opt-publish'), as this may not be instantiated.
      , options = {}
      , methSet = optionSet.children().find("[ok-sel]")
      ;
        // Create alternate selector values
        methSet.each(function(index) {
          var $this = $(this);
          $this.attr("ok-sortby-key", scope.getHash($this.attr("ok-sel")));
        });

        // Create sort data table, mapping selector to how value is returned for comparison
        var methods = scope.createSortByDataMethods(methSet);
        scope.storeMethods(methods);
      }
    };
  });

