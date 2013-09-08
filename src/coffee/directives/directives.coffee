angular.module("iso.directives", ["iso.config", "iso.services", "iso.controllers"])
angular.module("iso.directives").directive("isotopeContainer", ["$injector", "$parse", ($injector, $parse) ->
  "use strict"
  options = {}
  controller: "angularIsotopeController"
  link: (scope, element, attrs) ->
    linkOptions = []
    isoOptions = attrs.isoOptions
    isoInit = {}

    # If ui-options are passed, merge them onto global defaults.
    if isoOptions
      linkOptions = $parse(isoOptions)(scope)
      scope.updateOptions linkOptions  if angular.isObject(linkOptions)
    isoInit["element"] = element
    isoInit["isoOptionsEvent"] = attrs.isoOptionsSubscribe
    isoInit["isoMethodEvent"] = attrs.isoMethodSubscribe
    isoInit["isoMode"] = attrs.isoMode

    # allow some container iso's to be ignored
    scope.init isoInit  if attrs.isoIgnore isnt "true"
    element
]).directive("isotopeItem", ["iso.config", "$timeout", (config, $timeout) ->
  restrict: "A"
  link: (scope, element, attrs) ->
    $element = $(element)

    # handles cases where the isotopeItem is inside an isolate scope
    correctScope = (if scope.hasOwnProperty("$root") then scope.$parent else scope)

    #$element.addClass(scope.isotopeOptions.itemClass);
    correctScope.setIsoElement $element

    # Refresh after last element.
    if attrs.ngRepeat and true is correctScope.$last and "addItems" is correctScope.isoMode
      element.ready ->

        # mobile is just a bit slower, allow module configuration to provide a reasonable delay based on platform
        $timeout (->
          correctScope.refreshIso()
        ), config.refreshDelay or 0

    element
]).directive("isoSortbyData", ["optionsStore", (optionsStore) ->
  restrict: "A"
  controller: "isoSortByDataController"
  replace: true
  link: (scope, element, attrs) ->
    optionSet = $(element)
    optKey = optionSet.attr("ok-key")
    optEvent = "iso-opts" # Not attr('opt-publish'), as this may not be instantiated.
    options = {}
    methSet = optionSet.children().find("[ok-sel]")

    # Create alternate selector values
    methSet.each (index) ->
      $this = $(this)
      $this.attr "ok-sortby-key", scope.getHash($this.attr("ok-sel"))


    # Create sort data table, mapping selector to how value is returned for comparison
    methods = scope.createSortByDataMethods(methSet)
    scope.storeMethods methods
]).directive("optKind", ->
  restrict: "A"
  replace: true
  link: (scope, element, attrs) ->
    optionSet = $(element)
    optPublish = attrs.okPublish or "opt-kind"
    optKey = optionSet.attr("ok-key")
    selected = optionSet.find(".selected")
    preSelectOptions = {}

    # Emit dynamically made option object, e.g. {filter:'.my-filter-class'}
    createOptions = (item) ->
      if item
        option = {}
        virtualSortByKey = item.attr("ok-sortby-key")
        ascAttr = item.attr("opt-ascending")
        key = virtualSortByKey or item.attr("ok-sel")
        option["sortAscending"] = (if ascAttr then ascAttr is "true" else true)  if virtualSortByKey
        option[optKey] = key
        option

    emitOption = (option) ->
      scope.preSelectOptions = $.extend.apply(null, [true, scope.preSelectOptions].concat(option))
      option["ok"] = scope.preSelectOptions
      scope.$emit optPublish, option

    doOption = (event) ->
      event.preventDefault()
      selItem = $(event.target)

      # don't proceed if already selected
      return false  if selItem.hasClass("selected")
      optionSet.find(".selected").removeClass "selected"
      selItem.addClass "selected"
      emitOption createOptions(selItem)
      false


    # Initialize to selected values
    scope.preSelectOptions = createOptions(selected)  if selected.length

    # Delegate click
    optionSet.on "click", (event) ->
      doOption event
)

