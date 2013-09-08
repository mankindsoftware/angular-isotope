'use strict';

describe('Directive: isotopeDirectives', function() {
  beforeEach(module('iso.directives'));

  var element;

  it('should make hidden element visible', inject(function($rootScope, $compile) {
    element = angular.element('<isotope-directives></isotope-directives>');
    element = $compile(element)($rootScope);
    expect(element.text()).toBe('this is the isotopeDirectives directive');
  }));
});
