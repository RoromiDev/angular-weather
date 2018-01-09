'use strict';

angular.module('weather')

    .controller('settingsCtrl', ['$scope', 'citiesFactory', '$rootScope', '$http',
        function ($scope, citiesFactory, $rootScope, $http) {
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
                $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.data.city + '&units=metric&appid=23ea05fc73c2b86f12eed0a28e32f277')
                    .then(function (success){
                        citiesFactory.addCities($scope.data.city);
                    },function (error){
                        console.log("error");
                    });
            };
        }
    ]);