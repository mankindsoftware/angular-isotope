angular.module('iso.directives')
.directive('isoSortByData', function() {
  return {
    restrict: 'A'
    , controller: "isoSortByData"
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optKey = optionSet.attr('opt-key')
      , optEvent = optionSet.attr('opt-event')
      , options = {}
      , methSet = optionSet.children().find("[opt-sel]")
      ;
        // Create alternate selector values
        methSet.each(function(index) {
          var $this = $(this);
          $this.attr("opt-data-key", scope.getHash($this.attr("opt-sel")));
        });

        // Create sort data table, mapping selector to how value is returned for comparison
        var methods = scope.createSortByDataMethods(methSet);
        options["getSortData"] = methods;
        scope.$emit(optEvent, options);
      }
    };
  });

