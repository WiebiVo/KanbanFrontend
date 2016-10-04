'use strict';

angular.module('teamWork.ticket', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/kanbanBoard/:boardId/:boardName/ticket/:ticketId', {
            templateUrl: 'components/ticket/ticket.html',
            controller: 'ticketDetailController'

        });
    }])

    .controller('ticketDetailController', function ($scope, $http, Ticket, User, $routeParams, messages) {
        // create variable for ticketID, boardID and boardName
        var ticketId = $routeParams.ticketId;
        var boardId = $routeParams.boardId;
        var boardName = $routeParams.boardName;
        $scope.tId = ticketId;
        $scope.bName = boardName;
        $scope.bId = boardId;


        // make some new ticket status names to show it
        var ticketStatus = [{id: 'BACKLOG', name: 'backlog'},
            {id: 'TO_DO', name: 'to do'},
            {id: 'IN_PROGRESS', name: 'in progress'},
            {id: 'IN_TEST', name: 'in test'},
            {id: 'DONE', name: 'done'},
            {id: 'ARCHIVE', name: 'archive'}];
        $scope.ticketStatus = ticketStatus;


        // get ticket data by ticket-ID
        Ticket.byTicketId(ticketId).success(function (data) {
            $scope.ticket = data;

            // function for toggle change_assignee and change_status
            $scope.change_detail = function () {
                $scope.change_info = !$scope.change_info;
            };
        });


        //get Users by Board-ID to change the assignee
        User.byBoardId(boardId).success(function (data) {
            $scope.availableUsers = data;
        });


        // change status by Ticket-ID
        $scope.updateStatus = function ($status) {
            var requestObject = {newStatus: $status};
            Ticket.updateStatus(ticketId, requestObject).success(function (data) {
                console.log('Success: new status');
                messages.get().send(
                    "STATUS_UPDATE"
                );
            })
        };


        // update assignee by ticket id
        $scope.updateAssignee = function ($userId) {
            var requestObject = {newAssignee: $userId};
            Ticket.updateAssignee(ticketId, requestObject).success(function (data) {
                console.log('Success: new assignee');
            })
        };
    })



    // Comment Controller for get and post
    .controller('commentController', function ($scope, $http, Comment, $routeParams, $route) {

        // create variable for ticketID
        var ticketId = $routeParams.ticketId;

        // object to hold all the data for the new comment form
        $scope.commentData = {};


        // get comment for ticketId
        Comment.byTicketId(ticketId).success(function (data) {
            $scope.comments = data;
        });


        // save comment
        $scope.submitComment = function () {
            // save the comment for the correct ticket-id
            $scope.commentData.ticket = parseInt(ticketId);
            
            // function save comment
            Comment.saveComment($scope.commentData).success(function (data) {
                // if successful the new comment list reload
                Comment.byTicketId(ticketId).success(function (getData) {
                    $scope.comments = getData;
                    $route.reload();
                });
            }).error(function (data) {
                console.log('Error: save comment');
            });
        };
    });