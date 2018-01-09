'use strict';

angular.module('weather')

.controller('loginCtrl', ['$scope', '$http',
    function($scope, $http){
        $scope.data = {
            state: 'login',
            pseudo: '',
            password: ''
        };

        $scope.register = function() {
            $http({
                method: 'GET',
                url: 'https://angularjs.org/greet.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

        $scope.changeState = function(state) {
            $scope.data.state = state;
        };
    }
]);