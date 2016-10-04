'use strict';

// Declare app level module which depends on views, and components
angular.module('teamWork', [
    'ngRoute',
    'teamWork.login',
    'teamWork.dashboard',
    'teamWork.kanbanBoard',
    'teamWork.addBoard',
    'teamWork.updateTicket',
    'teamWork.ticket',
    'teamWork.version',
    'environment',
    'satellizer',
    'textAngular',
    'ngWebSocket',
    'commentService',
    'boardService',
    'ticketService',
    'userService'
]).config([
        '$locationProvider',
        '$routeProvider',
        'envServiceProvider',
        '$provide',
        '$authProvider',
        function ($locationProvider, $routeProvider, envServiceProvider, $provide, $authProvider, $websocketProvider) {

            $locationProvider.hashPrefix('!');
            $routeProvider.otherwise({redirectTo: '/login'});

            // modular config - angular environment
            envServiceProvider.config({
                domains: {
                    development: ['localhost'],
                    strato: ['teamwork.wiebke-vogel.de']
                },
                vars: {
                    development: {
                        apiUrl: 'http://localhost:8000/api',
                        authUrl: 'http://localhost:8000/api/authenticate'
                    },
                    strato: {
                        apiUrl: 'http://api.teamwork.wiebke-vogel.de/api',
                        authUrl: 'http://api.teamwork.wiebke-vogel.de/api/authenticate'
                    }
                }
            });
            envServiceProvider.check();
            // module Config - satellizer
            $authProvider.loginUrl = envServiceProvider.read('authUrl');
            //$authProvider.authToken = 'Bearer BAQTMxUSNwrQdUZVnpZbzq21WRzi1XwU';

        }])
    .run(['$rootScope', '$location', '$auth', function ($rootScope, $location, $auth) {

        // show Header and Footer if User is Logged in
        // when route changed - check if User is Logged in if not redirect to Login-Screen
        $rootScope.showHeaderFooter = $auth.isAuthenticated();
        $rootScope.$on('$routeChangeStart', function (event) {
            if (!$auth.isAuthenticated()) {
                $rootScope.showHeaderFooter = $auth.isAuthenticated();
                $location.path('/login');
            } else {
                $rootScope.showHeaderFooter = $auth.isAuthenticated();
            }
        });

    }]);



