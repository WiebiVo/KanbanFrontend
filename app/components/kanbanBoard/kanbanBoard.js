'use strict';

angular.module('teamWork.kanbanBoard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/kanbanBoard/:boardId/:boardName', {
            templateUrl: 'components/kanbanBoard/kanbanBoard.html',
            controller: 'kanbanBoardController'
        });
    }])

    .controller('kanbanBoardController', function ($scope, $http, Board, $routeParams, messages) {
        // create variable for boardID and boardName
        var boardId = $routeParams.boardId;
        var boardName = $routeParams.boardName;
        $scope.bName = boardName;
        $scope.bId = boardId;

        function renderTicketsOnBoard() {
            // get Tickets by Board-ID for Ticket-Status
            Board.byStatus(boardId).success(function (data) {
                $scope.tickets = data;

                // toggle the components
                $scope.toggle = function ($id) {
                    $scope[$id] = !$scope[$id];
                };

                // show archive coloumn
                $scope.archive = function () {
                    $scope.archive_board = !$scope.archive_board;
                };
            });
        };

        //refresh Board if somebody refresh the status
        messages.get().onMessage(function(event) {
            renderTicketsOnBoard();
        });

        renderTicketsOnBoard();
    });
