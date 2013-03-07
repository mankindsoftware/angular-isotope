angular.module('iso.directives')

.directive('optKind', function(){
  return {
    restrict: 'A'
    , replace: true
    , link: function(scope, element, attrs) {
      var optionSet = $(element)
      , optPublish = attrs.optPublish || "opt-kind-opt"
      , optKey = optionSet.attr('opt-key')
      , selected = optionSet.find('.selected')
      , preSelectOptions = {}
      ;

      // Emit dynamically made option object, e.g. {filter:'.my-filter-class'}
      var createOptions = function(item) {
        if (item) {
          var option = {}
          , virtualSortByKey = item.attr('opt-sortby-key')
          , ascAttr = item.attr('opt-ascending')
          , key = virtualSortByKey || item.attr('opt-sel')
          ;
          if (virtualSortByKey) {
            option['sortAscending'] = ascAttr ?  ascAttr === 'true' : true;
          }
          option[optKey] = key;

          return option;
        }
      }
      , emitOption = function(option) {
        scope.preSelectOptions = $.extend.apply( null, [true, scope.preSelectOptions].concat(option) );
        option['ok'] = scope.preSelectOptions;
        scope.$emit(optPublish, option);
      }
      , doOption = function(event) {
        event.preventDefault();

        var selItem = $(event.target);

        // don't proceed if already selected
        if ( selItem.hasClass('selected') ) {
          return false;
        }

        optionSet.find('.selected').removeClass('selected');
        selItem.addClass('selected');

        emitOption(createOptions(selItem));

        return false;
      }
      ;

      // Initialize to selected values
      if (selected.length) {
        scope.preSelectOptions = createOptions(selected);
      }

      // Delegate click
      optionSet.on('click', function(event) {
        doOption(event);
      });
    }
  };
});