angular.module("iso.services", ["iso.config"], [
  "$provide"
  ($provide) ->
    return $provide.factory("optionsStore", [
      "iso.config"
      (config) ->
        "use strict"
        storedOptions = undefined
        storedOptions = config.defaultOptions or {}
        return (
          store: (option) ->
            storedOptions = $.extend.apply(null, [
              true
              storedOptions
            ].concat(option))
            storedOptions

          retrieve: ->
            storedOptions
        )
    ])
]).value "iso.topics",
  MSG_OPT: "ng_iso_msgopt"
  MSG_METH: "ng_iso_msgmet"
  MSG_REMOVE: "ng_iso_remel"
