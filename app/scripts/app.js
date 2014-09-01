'use strict';

angular.module('jimmyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angular-websocket'
])
  // these should be taken from an external config shared with the node script
  .constant('config', {
    wsport: 8001,
    maxCountdown: 300
  })
  .config(function ($routeProvider, WebSocketProvider, config) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    WebSocketProvider
      .prefix('')
      .uri('ws://helpjim.me:' + config.wsport); // the port should be taken from the constant
  });
