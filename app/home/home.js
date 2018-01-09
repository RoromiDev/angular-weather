'use strict';

angular.module('weather')

    .controller('homeCtrl', ['$scope', '$http', '$interval', '$rootScope', 'citiesFactory',
        function ($scope, $http, $interval, $rootScope, citiesFactory) {
            $scope.data = {
                weather: citiesFactory.getWeather()
            };

            $rootScope.$on('weather', function(event, args) {
                $scope.updateWeather(args);
            });

            $scope.updateWeather = function(newweather) {
                $scope.data.weather = newweather;
            };
        }
    ]);