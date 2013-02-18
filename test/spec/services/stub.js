'use strict';

describe('Service: stub', function () {

  // load the service's module
  beforeEach(module('isotopeApp'));

  // instantiate service
  var stub;
  beforeEach(inject(function(_stub_) {
    stub = _stub_;
  }));

  it('should do something', function () {
    expect(!!stub).toBe(true);
  });

});
