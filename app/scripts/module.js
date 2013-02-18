angular.module('iso.config', []).value('iso.config', {});
angular.module('iso.filters', ['iso.config']);
angular.module('iso.directives', ['iso.config']);
angular.module('iso', ['iso.filters', 'iso.directives', 'iso.config']);