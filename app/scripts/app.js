'use strict';

angular.module('jimmyApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap',
  'angular-websocket'
])
  .config(function ($routeProvider, WebSocketProvider) {
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
      .uri('ws://helpjim.me:8001');
  });
