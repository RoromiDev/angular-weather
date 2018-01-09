'use strict';

angular.module('weather')

    .factory('citiesFactory', ['$interval', '$http', '$rootScope', '$timeout', '$q', function($interval, $http, $rootScope, $timeout, $q) {

        var cities = ['Montpellier', 'Bastia', 'Ajaccio'];
        var weather = [];

        function getWeather() {
            var http = [];
            weather = [];

            for (var i = 0; i < cities.length; i++) {
                http.push($http.get('http://api.openweathermap.org/data/2.5/weather?q=' + cities[i] + '&units=metric&appid=23ea05fc73c2b86f12eed0a28e32f277'));
            }

            $q.all(http).then(function(values) {
                for (var i = 0; i < values.length; i++) {
                    weather.push({city: values[i].data.name, temp: parseInt(values[i].data.main.temp), weather: 'http://openweathermap.org/img/w/' + values[i].data.weather[0].icon + '.png', coords: values[i].data.coord});
                }
                $rootScope.$emit("weather", weather);
            });
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