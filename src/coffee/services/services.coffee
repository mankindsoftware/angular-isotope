angular.module("iso.services", ["iso.config"], ['$provide', ($provide) ->
  $provide.factory("optionsStore", ["iso.config", (config) ->
    "use strict"
    storedOptions = config.defaultOptions or {}
    store: (option) ->
      storedOptions = $.extend.apply(null, [true, storedOptions].concat(option))

    retrieve: ->
      storedOptions
  ])
])
