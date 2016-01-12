// Create all modules and define dependencies to make sure they exist
// and are loaded in the correct order to satisfy dependency injection
// before all nested files are concatenated by Grunt

// Config
angular.module('iso.config', [])
    .value('iso.config', {
        debug: true
    });

// Modules
angular.module('iso.directives', ['iso.services']);
angular.module('iso.services', []);
angular.module('iso',
    [
        'iso.config',
        'iso.directives',
        'iso.services'
    ]);


