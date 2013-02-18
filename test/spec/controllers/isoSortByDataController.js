'use strict';

describe('Controller: kindOptsController', function() {

  // load the controller's module
  beforeEach(module('isotopeApp'));

  var kindOptsController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    kindOptsController = $controller('kindOptsController', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function() {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
