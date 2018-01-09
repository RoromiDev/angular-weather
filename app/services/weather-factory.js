'use strict';

angular.module('weather')

    .factory('citiesFactory', ['$http', function($http) {

        var cities = ['Montpellier', 'Bastia', 'Ajaccio'];

        return {
            getCities: function(){
                return cities;
            },

            setCities: function(newcities){
                cities = newcities;
            }
        }

    }]);