'use strict';

describe('Service: optionStore', function () {

  // load the service's module
  beforeEach(module('isotopeApp'));

  // instantiate service
  var optionStore;
  beforeEach(inject(function(_optionStore_) {
    optionStore = _optionStore_;
  }));

  it('should do something', function () {
    expect(!!optionStore).toBe(true);
  });

});
