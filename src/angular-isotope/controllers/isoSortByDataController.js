var isoSortByDataController = function($scope, optionsStore) {
  'use strict';

  $scope.getHash = function(s) {
      return 'opt'+ s; // TODO: Replace non-key chars '.', '#', '[',']'
  };

  $scope.storeMethods = function(methods) {
    optionsStore.store({getSortData: methods});
  };

  $scope.optSortData = function(item, index) {
      var elementSortData = {}
      , $item = $(item)
      , selector = $item.attr('opt-sel')
      , type = $item.attr('opt-type')
      , sortKey = $scope.getHash(selector)
      , fun = $item.attr('opt-convert') ? eval('[' + $item.attr('opt-convert') + ']')[0] : null
      , genSortDataClosure = function(selector, type, convert) {
          return function($elem) {
              return getValue(selector, $elem, type, convert);
          };
      }
      ;

      elementSortData[sortKey] = genSortDataClosure(selector, type, fun);
      return elementSortData;
    };

    $scope.createSortByDataMethods = function(elem) {
      var options=$(elem)
      , sortDataArray = reduce($.map(options, $scope.optSortData))
      ;
      return sortDataArray;
    };

    var reduce = function(list) {
      var reduction = {};
      $.each(list, function (index, item) {
        $.extend(reduction, item);
      });
      return reduction;
    }

    , getValue = function(selector, $elem, type, evaluate) {
      var getText = function($elem, item, selector) {
          if (!item.length) {
              return $elem.text();
          }
          var text = "";
          switch (selector.charAt(0)) {
              case '#': text = item.text();
              break;
              case '.': text = item.text();
              break;
              case '[': text = item.attr(selector.replace('[','').replace(']','').split()[0]);
              break;
          }
          return text;
      }
      , toType = function(text, type) {
          var numCheck = function(val) {
            return isNaN(val) ? Number.POSITIVE_INFINITY : val;
          }
          , utility = {
              text: function(s) {
                  return s.toString();
              }
              , integer: function(s) {
                  return numCheck(parseInt(s, 10));
              }
              , float: function(s) {
                  return numCheck(parseFloat(s));
              }
              , boolean: function(s) {
                  return 'true' === s;
              }
          };
          return utility[type] ? utility[type](text) : text;
      }
      , item = $elem.find(selector)
      , text = getText($elem, item, selector)
      , val = toType(text, type);
      return evaluate ? evaluate(val) : val;
    };
};

