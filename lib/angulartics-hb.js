(function(angular) {
'use strict';

/**
 * @ngdoc overview
 * @name angulartics.hb
 * Enables analytics support for HB logging
 */
angular.module('angulartics.hb', ['angulartics'])
.config(['$analyticsProvider', 'HbLogService', function ($analyticsProvider, HbLogService) {

  /**
   * Track Event in HB
   * @name eventTrack
   *
   * @param {string} action Required 'action' (string) associated with the event
   * @param {object} properties = metadata
   *
   */
  $analyticsProvider.registerEventTrack(function (action, properties) {
    HbLogService.log.event(action, properties);
  });

}]);
})(angular);
