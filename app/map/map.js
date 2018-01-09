'use strict';

angular.module('weather')

    .controller('mapCtrl', ['$scope', 'citiesFactory', '$rootScope', '$interval',
        function ($scope, citiesFactory, $rootScope, $interval) {
            $scope.data = {
                weather: citiesFactory.getWeather(),
                map: '',
                markers: []
            };

            $rootScope.$on('weather', function(event, args) {
                $scope.updateWeather(args);
            });

            $scope.updateWeather = function(newweather) {
                $scope.data.weather = newweather;
                $scope.removeMarkers();
                $scope.addMarkers();
            };

            $scope.initMap = function() {
                $scope.data.map = L.map('map').setView([45.75, 4.85], 5);

                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo($scope.data.map);

                $scope.addMarkers();
            };

            $scope.addMarkers = function() {
                for (var i = 0; i < $scope.data.weather.length; i++) {
                    var marker = L.marker([$scope.data.weather[i].coords.lat, $scope.data.weather[i].coords.lon]).addTo($scope.data.map);
                    marker.bindPopup("<b>" + $scope.data.weather[i].city + "</b><br>" + $scope.data.weather[i].temp + "°C").openPopup();
                    $scope.data.markers.push(marker);
                }
            };

            $scope.removeMarkers = function() {
                for (var i = 0; i < $scope.data.markers.length; i++) {
                    $scope.data.map.removeLayer($scope.data.markers[i]);
                }
            };

            $scope.initMap();
        }
    ]);