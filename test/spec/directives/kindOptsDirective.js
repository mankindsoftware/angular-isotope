'use strict';

describe('Directive: mankOptionsDirective', function() {
  beforeEach(module('isotopeApp'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<mank-options-directive></mank-options-directive>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the mankOptionsDirective directive');
  }));
});
