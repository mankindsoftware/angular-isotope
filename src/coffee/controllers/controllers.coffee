angular.module("iso.controllers", [
  "iso.config"
  "iso.services"
]).controller("angularIsotopeController", [
  "iso.config"
  "iso.topics"
  "$scope"
  "$timeout"
  "optionsStore"
  (config, topics, $scope, $timeout, optionsStore) ->
    "use strict"
    buffer = undefined
    initEventHandler = undefined
    isoMode = undefined
    isotopeContainer = undefined
    methodHandler = undefined
    onLayoutEvent = undefined
    optionsHandler = undefined
    postInitialized = undefined
    scope = undefined
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
      initEventHandler $scope.$on, isoInit.isoOptionsEvent or topics.MSG_OPT, optionsHandler
      initEventHandler $scope.$on, isoInit.isoMethodEvent or topics.MSG_METH, methodHandler
      $scope.isoMode = isoInit.isoMode or "addItems"
      $timeout ->
        opts = optionsStore.retrieve()
        isotopeContainer.isotope opts
        postInitialized = true
        return


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
      return

    optionsHandler = (event, option) ->
      $scope.updateOptions option

    methodHandler = (event, option) ->
      fun = undefined
      params = undefined
      fun = option.fun
      params = option.params
      fun.apply $scope, params

    $scope.removeAll = (cb) ->
      isotopeContainer.isotope "remove", isotopeContainer.data("isotope").$allAtoms, cb

    $scope.refresh = ->
      isotopeContainer.isotope()

    $scope.$on config.refreshEvent, ->
      $scope.refreshIso()

    $scope.$on topics.MSG_REMOVE, (message, element) ->
      $scope.removeElement element

    $scope.removeElement = (element) ->
      isotopeContainer.isotope "remove", element
]).controller "isoSortByDataController", [
  "iso.config"
  "$scope"
  "optionsStore"
  (config, $scope, optionsStore) ->
    getValue = undefined
    reduce = undefined
    $scope.getHash = (s) ->
      "opt" + s

    $scope.storeMethods = (methods) ->
      optionsStore.store getSortData: methods

    $scope.optSortData = (item, index) ->
      $item = undefined
      elementSortData = undefined
      fun = undefined
      genSortDataClosure = undefined
      selector = undefined
      sortKey = undefined
      type = undefined
      elementSortData = {}
      $item = $(item)
      selector = $item.attr("ok-sel")
      type = $item.attr("ok-type")
      sortKey = $scope.getHash(selector)
      fun = ((if $item.attr("opt-convert") then eval_("[" + $item.attr("opt-convert") + "]")[0] else null))
      genSortDataClosure = (selector, type, convert) ->
        ($elem) ->
          getValue selector, $elem, type, convert

      elementSortData[sortKey] = genSortDataClosure(selector, type, fun)
      elementSortData

    $scope.createSortByDataMethods = (elem) ->
      options = undefined
      sortDataArray = undefined
      options = $(elem)
      sortDataArray = reduce($.map(options, $scope.optSortData))
      sortDataArray

    reduce = (list) ->
      reduction = undefined
      reduction = {}
      $.each list, (index, item) ->
        $.extend reduction, item

      reduction

    getValue = (selector, $elem, type, evaluate) ->
      getText = undefined
      item = undefined
      text = undefined
      toType = undefined
      val = undefined
      getText = ($elem, item, selector) ->
        text = undefined
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
        numCheck = undefined
        utility = undefined
        numCheck = (val) ->
          if isNaN(val)
            Number.POSITIVE_INFINITY
          else
            val

        utility =
          text: (s) ->
            s.toString()

          integer: (s) ->
            numCheck parseInt(s, 10)

          float: (s) ->
            numCheck parseFloat(s)

          boolean: (s) ->
            "true" is s

        if utility[type]
          utility[type] text
        else
          text

      item = $elem.find(selector)
      text = getText($elem, item, selector)
      val = toType(text, type)
      if evaluate
        evaluate val
      else
        val
]