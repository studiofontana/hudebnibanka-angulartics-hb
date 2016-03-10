(function (angular) {
    'use strict';

    /**
     * @ngdoc overview
     * @name angulartics.hb
     * Enables analytics support for HB logging
     */
    angular.module('angulartics.hb', ['angulartics'])
        .config(['$analyticsProvider', '$documentProvider', function ($analyticsProvider, $documentProvider) {

            var hbService;
            var $document = $documentProvider.$get;

            angulartics.waitForVendorApi("HbLogService", 1000, registerEvents);

            function registerEvents(HbLogService) {
                hbService = HbLogService;
                if (hbService) {
                    $analyticsProvider.registerPageTrack(pageTrack);
                    $analyticsProvider.registerEventTrack(eventTrack);
                }
            }

            function pageTrack(path, properties) {
                var title = properties && properties.title ? properties.title : ($document[0].title ? $document[0].title : null);
                var type = validateType(properties && properties.type ? properties.type : null);
                hbService.log.pageview(path, title, type);
            }

            function eventTrack(action, properties) {
                hbService.log.event(action, properties);
            }

            function validateType (type) {
                var TYPE_ENUM = ['click', 'download', 'outbound', 'pageview'];
                return (TYPE_ENUM.indexOf(type) >= 0) ? type : 'pageview';
            }

        }]);
})(angular);
