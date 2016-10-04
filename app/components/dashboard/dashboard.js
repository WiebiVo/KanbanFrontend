'use strict';

angular.module('teamWork.dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'components/dashboard/dashboard.html',
            controller: 'dashboardController'
        });
    }])

    .controller('dashboardController', function ($scope, $http, Board) {

        // get all boards for a User
        Board.boards().success(function (data) {
            $scope.boards = data;
        });

    });




