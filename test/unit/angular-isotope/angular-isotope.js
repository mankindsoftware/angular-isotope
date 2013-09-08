'use strict';

// Set the jasmine fixture path
// jasmine.getFixtures().fixturesPath = 'base/';

describe('angular-isotope', function() {

    var module;
    var dependencies;
    dependencies = [];

    var hasModule = function(module) {
        return dependencies.indexOf(module) >= 0;
    };

    beforeEach(function() {

        // Get module
        module = angular.module('angular-isotope');
        dependencies = module.requires;
    });

    it('should load config module', function() {
        expect(hasModule('angular-isotope.config')).toBeTruthy();
    });

    

    
    it('should load directives module', function() {
        expect(hasModule('angular-isotope.directives')).toBeTruthy();
    });
    

    
    it('should load services module', function() {
        expect(hasModule('angular-isotope.services')).toBeTruthy();
    });
    

});
