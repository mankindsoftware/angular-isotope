angular.module "iso.directives", [
  "iso.config"
  "iso.services"
  "iso.controllers"
]
angular.module("iso.directives").directive("isotopeContainer", [
  "$injector"
  "$parse"
  ($injector, $parse) ->
    "use strict"
    options = undefined
    options = {}
    return (
      controller: "angularIsotopeController"
      link: (scope, element, attrs) ->
        isoInit = undefined
        isoOptions = undefined
        linkOptions = undefined
        linkOptions = []
        isoOptions = attrs.isoOptions
        isoInit = {}
        if isoOptions
          linkOptions = $parse(isoOptions)(scope)
          scope.updateOptions linkOptions  if angular.isObject(linkOptions)
        isoInit.element = element
        isoInit.isoOptionsEvent = attrs.isoOptionsSubscribe
        isoInit.isoMethodEvent = attrs.isoMethodSubscribe
        isoInit.isoMode = attrs.isoMode
        scope.init isoInit  if attrs.isoIgnore isnt "true"
        element
    )
]).directive("isotopeItem", [
  "$rootScope"
  "iso.config"
  "iso.topics"
  "$timeout"
  ($rootScope, config, topics, $timeout) ->
    return (
      restrict: "A"
      require: "^isotopeContainer"
      link: (scope, element, attrs) ->
        scope.setIsoElement element
        scope.$on "$destroy", (message) ->
          $rootScope.$broadcast topics.MSG_REMOVE, element
          return

        if attrs.ngRepeat and true is scope.$last and "addItems" is scope.isoMode
          element.ready ->
            $timeout (->
              scope.refreshIso()
            ), config.refreshDelay or 0

        element
    )
]).directive("isoSortbyData", ->
  restrict: "A"
  controller: "isoSortByDataController"
  link: (scope, element, attrs) ->
    methSet = undefined
    methods = undefined
    optEvent = undefined
    optKey = undefined
    optionSet = undefined
    options = undefined
    optionSet = $(element)
    optKey = optionSet.attr("ok-key")
    optEvent = "iso-opts"
    options = {}
    methSet = optionSet.find("[ok-sel]")
    methSet.each (index) ->
      $this = undefined
      $this = $(this)
      $this.attr "ok-sortby-key", scope.getHash($this.attr("ok-sel"))

    methods = scope.createSortByDataMethods(methSet)
    scope.storeMethods methods
).directive "optKind", [
  "optionsStore"
  (optionsStore) ->
    return (
      restrict: "A"
      controller: "isoSortByDataController"
      link: (scope, element, attrs) ->
        createSortByDataMethods = undefined
        createOptions = undefined
        doOption = undefined
        emitOption = undefined
        optKey = undefined
        optPublish = undefined
        methPublish = undefined
        optionSet = undefined
        determineAciveClass = undefined
        activeClass = undefined
        activeSelector = undefined
        active = undefined
        optionSet = $(element)
        optPublish = attrs.okPublish or topics.MSG_OPT
        methPublish = attrs.okPublish or topics.MSG_METH
        optKey = optionSet.attr("ok-key")
        determineActiveClass = ->
          activeClass = attrs.okActiveClass
          activeClass = (if optionSet.find(".selected").length then "selected" else "active")  unless activeClass
          activeSelector = "." + activeClass
          active = optionSet.find(activeSelector)
          return

        createSortByDataMethods = (optionSet) ->
          methSet = undefined
          methods = undefined
          optKey = undefined
          options = undefined
          optKey = optionSet.attr("ok-key")
          return  if optKey isnt "sortBy"
          options = {}
          methSet = optionSet.find("[ok-sel]")
          methSet.each (index) ->
            $this = undefined
            $this = $(this)
            $this.attr "ok-sortby-key", scope.getHash($this.attr("ok-sel"))

          methods = scope.createSortByDataMethods(methSet)
          scope.storeMethods methods

        createOptions = (item) ->
          ascAttr = undefined
          key = undefined
          option = undefined
          virtualSortByKey = undefined
          if item
            option = {}
            virtualSortByKey = item.attr("ok-sortby-key")
            ascAttr = item.attr("opt-ascending")
            key = virtualSortByKey or item.attr("ok-sel")
            option.sortAscending = ((if ascAttr then ascAttr is "true" else true))  if virtualSortByKey
            option[optKey] = key
            option

        emitOption = (option) ->
          optionsStore.store option
          scope.$emit optPublish, option

        doOption = (event) ->
          selItem = undefined
          event.preventDefault()
          selItem = $(event.target)
          return false  if selItem.hasClass(activeClass)
          optionSet.find(activeSelector).removeClass activeClass
          selItem.addClass activeClass
          emitOption createOptions(selItem)
          false

        determineActiveClass()
        createSortByDataMethods optionSet
        if active.length
          opts = createOptions(active)
          optionsStore.store opts
        optionSet.on "click", (event) ->
          doOption event

    )
]