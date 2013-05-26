angular.module('iso.config', []).value('iso.config', {});
angular.module('iso.filters', ['iso.config']);
angular.module('iso.services', ['iso.config']);
angular.module('iso.directives', ['iso.config', 'iso.services']);
angular.module('iso', ['iso.filters', 'iso.services', 'iso.directives', 'iso.config']);