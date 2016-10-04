'use strict';

angular.module('teamWork.addBoard', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/addBoard', {
            templateUrl: 'components/addBoard/addBoard.html',
            controller: 'boardController'
        });
    }])


    .controller('boardController', function ($scope, $http, Board, User, envService, $location, $rootScope) {

        // object to hold all the data for the new board form
        $scope.boardData = {};

        // save a board
        $scope.submitBoard = function () {
            Board.saveBoard($scope.boardData).success(function (data) {
                // save successfull get all the boards and redirect to dashboard
                Board.boards().success(function (getData) {
                    $scope.boards = getData;
                });
                $location.path('/dashboard');
            }).error(function (data) {
                console.log('Error: Save Board');
            });
        };


        // get all Users and remove current
        User.users().success(function (data) {
            $scope.users = data;
        });


        // object to hold all members for one board
        $scope.boardData.members = [{id: ''}];

        // when User click plus to add a new Member
        $scope.addNewMember = function () {
            $scope.boardData.members.push({id: ''});
            $scope.showRemoveButton = $scope.boardData.members.length > 1;
        };

        // when User click minus to remove a Member
        $scope.removeMember = function () {
            var lastItem = $scope.boardData.members.length - 1;
            $scope.boardData.members.splice(lastItem);

            $scope.showRemoveButton = $scope.boardData.members.length > 1;
        };
    });



