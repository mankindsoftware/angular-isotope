angular.module('iso.directives')

.directive('optKind', function(){
  return {
    restrict: 'A'
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optPublish = attrs.optPublish || "opt-kind-opt"
      , optKey = optionSet.attr('opt-key')
      ;

      var getValue = function(item) {
        return item.attr('opt-sortby-key') || item.attr('opt-sel');
      };

      // Emit dynamically made option object, e.g. {filter:'.my-filter-class'}
      var emitOption = function(val) {
        if (val) {
          var option = {};
          option[optKey] = val;
          scope.$emit(optPublish, option);
        }
      };

      // Initialize to selected values
      emitOption(getValue(optionSet.find('.selected')));
      
      // Delegate click
      optionSet.on('click', function(event) {
        doOption(event);
      });

      function doOption(event) {
        event.preventDefault();

        var selItem = $(event.target);

        // don't proceed if already selected
        if ( selItem.hasClass('selected') ) {
          return false;
        }

        optionSet.find('.selected').removeClass('selected');
        selItem.addClass('selected');
  
        emitOption(getValue(selItem));

        return false;
      }
    }
  };
});