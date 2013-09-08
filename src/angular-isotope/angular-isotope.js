// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('angular-isotope.config', [])
    .value('angular-isotope.config', {
        debug: true
    });

// Modules
angular.module('angular-isotope.directives', ['angular-isotope.services']);
angular.module('angular-isotope.services', []);
angular.module('angular-isotope',
    [
        'angular-isotope.config',
        'angular-isotope.directives',
        'angular-isotope.services'
    ]);


