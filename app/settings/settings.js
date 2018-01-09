'use strict';

angular.module('weather')

    .controller('settingsCtrl', ['$scope', 'citiesFactory', '$http', '$interval',
        function ($scope, citiesFactory, $http, $interval) {
            $scope.data = {
                state: 1,
                cities: citiesFactory.getCities(),
                values: '',
                weather: [],
                city: ''
            };

            $scope.getData = function () {
                for (var i = 0; i < $scope.data.cities.length; i++) {
                    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + $scope.data.cities[i] + '&units=metric&appid=23ea05fc73c2b86f12eed0a28e32f277')
                        .then(function (success) {
                            $scope.data.weather.push({city: success.data.name, temp: parseInt(success.data.main.temp), weather: 'http://openweathermap.org/img/w/' + success.data.weather[0].icon + '.png'});
                            console.log($scope.data.weather);
                        }, function (error) {
                            console.log(error);
                        });
                }
            };

            $scope.removeCity = function(index) {
                $scope.data.cities.splice(index, 1);
                $scope.data.weather.splice(index, 1);
                citiesFactory.setCities($scope.data.cities);
            };

            $scope.updateState = function(state) {
                $scope.data.state = state;
            };

            $scope.addCity = function() {
                $scope.data.cities.push($scope.data.city);
                citiesFactory.setCities($scope.data.cities);
                $scope.data.weather = [];
                $scope.getData();
            };

            $scope.getData();
        }
    ]);