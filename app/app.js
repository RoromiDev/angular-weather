'use strict';

// Declare app level module which depends on views, and components
angular.module('weather', [
    'ngRoute'
])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $routeProvider
            .when('/settings', {
                templateUrl: 'settings/settings.html',
                controller: 'settingsCtrl'
            })
            .when('/home', {
                templateUrl: 'home/home.html',
                controller: 'homeCtrl'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }]);
