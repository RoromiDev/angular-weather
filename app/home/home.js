'use strict';

angular.module('weather')

    .controller('homeCtrl', ['$scope', '$http', '$interval', 'citiesFactory',
        function ($scope, $http, $interval, citiesFactory) {
            $scope.data = {
                cities: citiesFactory.getCities(),
                values: '',
                weather: []
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

            $scope.getData();

            $interval(function() {
                $scope.data.weather = []
                $scope.getData();
            }, 60000);
        }
    ]);