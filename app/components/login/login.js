'use strict';

angular.module('teamWork.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'components/login/login.html',
            controller: 'authenticateController'
        });

    }])

    .controller('authenticateController', function ($auth, $scope, $rootScope, $http, $location, $window, User) {

        // object to hold all the data for the new user form
        $scope.userData = {};

        //create an account and login
        $scope.submitUser = function () {
            User.saveUser($scope.userData).success(function (data) {
                // after sign up a user login
                var credentials = {
                    email: $scope.userData.email,
                    password: $scope.userData.password
                };
                // Use Satellizer's $auth service to login
                $auth.login(credentials).then(function (data) {
                    // If login is successful, redirect to the users state
                    $location.path('/dashboard');
                }, function (error) {
                    console.log('Error: login after create an account');
                });
            }).error(function (data) {
                console.log('Error: create an account');
            });
        };


        // function to login a user
        $scope.login = function () {
            var credentials = {
                email: this.email,
                password: this.password
            };

            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function (data) {
                // If login is successful, redirect to the users state
                // write current User in rootScope
                User.currentUser().success(function(data){
                    $rootScope.currentUser = data;
                });
                $location.path('/dashboard');
            }, function (error) {
                console.log('Error: login');
            });
        };


        // function to logout a user
        $scope.logout = function () {
            $auth.logout().then(function (data) {
                // If logout is successful, redirect to the login screen
                $location.path('/');
            }, function (error) {
                console.log('Error: logout');
            });
        };

    });
