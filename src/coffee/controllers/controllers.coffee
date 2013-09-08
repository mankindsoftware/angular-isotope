angular.module("iso.controllers", ["iso.config", "iso.services"])
.controller("angularIsotopeController", ["iso.config", "$scope", "$timeout", "optionsStore", (config, $scope, $timeout, optionsStore) ->
  "use strict"
  onLayoutEvent = "isotope.onLayout"
  postInitialized = false
  isotopeContainer = null
  buffer = []
  scope = ""
  isoMode = ""
  $scope.$on onLayoutEvent, (event) ->

  $scope.layoutEventEmit = ($elems, instance) ->
    $timeout ->
      $scope.$apply ->
        $scope.$emit onLayoutEvent



  optionsStore.store onLayout: $scope.layoutEventEmit
  initEventHandler = (fun, evt, hnd) ->
    fun.call $scope, evt, hnd  if evt

  $scope.init = (isoInit) ->
    isotopeContainer = isoInit.element
    initEventHandler $scope.$on, isoInit.isoOptionsEvent, optionsHandler
    initEventHandler $scope.$on, isoInit.isoMethodEvent, methodHandler
    $scope.isoMode = isoInit.isoMode or "addItems"
    $timeout ->
      isotopeContainer.isotope optionsStore.retrieve()
      postInitialized = true


  $scope.setIsoElement = ($element) ->
    if postInitialized
      $timeout ->
        isotopeContainer.isotope $scope.isoMode, $element


  $scope.refreshIso = ->
    isotopeContainer.isotope()  if postInitialized

  $scope.updateOptions = (option) ->
    if isotopeContainer
      isotopeContainer.isotope option
    else
      optionsStore.store option


  # Event handling.
  optionsHandler = (event, option) ->
    $scope.updateOptions option

  methodHandler = (event, option) ->
    fun = option.fun
    params = option.params
    fun.apply $scope, params


  # Defaults
  initEventHandler $scope.$on, "iso-opts", optionsHandler
  initEventHandler $scope.$on, "iso-method", methodHandler

  # Not used here.
  $scope.removeAll = (cb) ->
    isotopeContainer.isotope "remove", isotopeContainer.data("isotope").$allAtoms, cb

  $scope.refresh = ->
    isotopeContainer.isotope()

  $scope.$on config.refreshEvent, ->
    $scope.refreshIso()

]).controller("isoSortByDataController", ["iso.config", "$scope", "optionsStore", (config, $scope, optionsStore) ->
  $scope.getHash = (s) ->
    "opt" + s # TODO: Replace non-key chars '.', '#', '[',']'

  $scope.storeMethods = (methods) ->
    optionsStore.store getSortData: methods

  $scope.optSortData = (item, index) ->
    elementSortData = {}
    $item = $(item)
    selector = $item.attr("ok-sel")
    type = $item.attr("ok-type")
    sortKey = $scope.getHash(selector)
    fun = (if $item.attr("opt-convert") then eval_("[" + $item.attr("opt-convert") + "]")[0] else null)
    genSortDataClosure = (selector, type, convert) ->
      ($elem) ->
        getValue selector, $elem, type, convert

    elementSortData[sortKey] = genSortDataClosure(selector, type, fun)
    elementSortData

  $scope.createSortByDataMethods = (elem) ->
    options = $(elem)
    sortDataArray = reduce($.map(options, $scope.optSortData))
    sortDataArray

  reduce = (list) ->
    reduction = {}
    $.each list, (index, item) ->
      $.extend reduction, item

    reduction

  getValue = (selector, $elem, type, evaluate) ->
    getText = ($elem, item, selector) ->
      return $elem.text()  unless item.length
      text = ""
      switch selector.charAt(0)
        when "#"
          text = item.text()
        when "."
          text = item.text()
        when "["
          text = item.attr(selector.replace("[", "").replace("]", "").split()[0])
      text

    toType = (text, type) ->
      numCheck = (val) ->
        (if isNaN(val) then Number.POSITIVE_INFINITY else val)

      utility =
        text: (s) ->
          s.toString()

        integer: (s) ->
          numCheck parseInt(s, 10)

        float: (s) ->
          numCheck parseFloat(s)

        boolean: (s) ->
          "true" is s

      (if utility[type] then utility[type](text) else text)

    item = $elem.find(selector)
    text = getText($elem, item, selector)
    val = toType(text, type)
    (if evaluate then evaluate(val) else val)
])

