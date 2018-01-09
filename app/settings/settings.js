'use strict';

angular.module('weather')

    .controller('settingsCtrl', ['$scope', 'citiesFactory', '$rootScope', '$interval',
        function ($scope, citiesFactory, $rootScope, $interval) {
            $scope.data = {
                weather: citiesFactory.getWeather(),
                city: ''
            };

            $rootScope.$on('weather', function (event, args) {
                $scope.updateWeather(args);
            });

            $scope.updateWeather = function (newweather) {
                $scope.data.weather = newweather;
            };

            $scope.removeCity = function (index) {
                citiesFactory.removeCities(index);
            };

            $scope.addCity = function () {
                citiesFactory.addCities($scope.data.city);
            };
        }
    ]);