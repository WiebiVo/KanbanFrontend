'use strict';

angular.module('teamWork.updateTicket', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/kanbanBoard/:boardId/:boardName/add', {
            templateUrl: 'components/updateTicket/updateTicket.html',
            controller: 'addTicketController'
        });
        $routeProvider.when('/kanbanBoard/:boardId/:boardName/edit/:ticketId', {
            templateUrl: 'components/updateTicket/updateTicket.html',
            controller: 'addTicketController'
        });
    }])

    .controller('addTicketController', function ($scope, $http, Ticket, User, $routeParams, $location) {

        // create variable for ticketID, boardID and boardName
        var boardId = $routeParams.boardId;
        var boardName = $routeParams.boardName;
        var ticketId = $routeParams.ticketId;


        // show available Users for a ticket
        User.byBoardId(boardId).success(function (data) {
            $scope.availableUsers = data;
        });


        // add ticket get from database if id is set
        // first update ticket if ticketId is not null
        if (ticketId != null) {
            Ticket.byTicketId(ticketId).success(function (data) {
                // transform timestamp to date
                data.due_date = new Date(data.due_date);
                $scope.ticketData = data;
            });

            // update a ticket
            $scope.submitTicket = function () {
                $scope.ticketData.due_date_ts = $scope.ticketData.due_date.getTime();
                Ticket.updateTicket(ticketId, $scope.ticketData).success(function (data) {
                    $location.path('/kanbanBoard/' + boardId + '/' + boardName + '/ticket/' + ticketId);
                }).error(function (data) {
                    console.log('Error: update Ticket');
                });
            };
        }
        // create ticket
        else {
            // initialise empty if not set
            $scope.ticketData = {};

            //create a ticket
            $scope.submitTicket = function () {
                $scope.ticketData.board_id = parseInt(boardId);
                // backlog is the first status when a ticket is created
                $scope.ticketData.status = 'BACKLOG';

                Ticket.saveTicket($scope.ticketData).success(function (data) {
                    $location.path('/kanbanBoard/' + boardId + '/' + boardName);
                }).error(function (data) {
                    console.log('Error: create Ticket');
                });
            };
        }
    });

