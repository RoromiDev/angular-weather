'use strict';

angular.module('weather')

    .factory('citiesFactory', ['$interval', '$http', '$rootScope', '$timeout', function($interval, $http, $rootScope, $timeout) {

        var cities = ['Montpellier', 'Bastia', 'Ajaccio'];
        var weather = [];

        function getWeather() {
            console.log(cities);
            weather = [];
            for (var i = 0; i < cities.length; i++) {
                $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cities[i] + '&units=metric&appid=23ea05fc73c2b86f12eed0a28e32f277')
                    .then(function (success) {
                        weather.push({city: success.data.name, temp: parseInt(success.data.main.temp), weather: 'http://openweathermap.org/img/w/' + success.data.weather[0].icon + '.png'});
                    }, function (error) {
                        console.log(error);
                    });
            }
            $timeout(function () {
                $rootScope.$emit("weather", weather);
            }, 1000);
        }

        getWeather();

        // Refresh data every minute
        $interval(function() {
            getWeather();
        }, 60000);

        return {
            addCities: function(city){
                cities.push(city);
                getWeather();
            },

            removeCities: function(index){
                cities.splice(index, 1);
                getWeather();
            },

            getWeather: function(){
                return weather;
            }
        }

    }]);