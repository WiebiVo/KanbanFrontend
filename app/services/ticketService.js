/**
 * Created by Wiebke on 12.06.16.
 */
angular.module('ticketService', []).factory('Ticket', function ($http, envService) {

    return {
        // get all tickets by boardID
        byBoardId: function ($boardId) {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/board/' + $boardId + '/tickets');
        },

        // get a ticket by ticketId
        byTicketId: function ($ticketId) {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/ticket/' + $ticketId);
        },

        // create a ticket
        saveTicket: function (ticketData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'POST',
                url: apiUrl + '/create/ticket',
                headers: {'Content-Type': 'application/json'},
                data: ticketData
            });

        },

        // update an existing ticket
        updateTicket: function ($ticketId, ticketData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'PUT',
                url: apiUrl + '/update/' + $ticketId + '/ticket',
                headers: {'Content-Type': 'application/json'},
                data: ticketData
            })

        },

        // update the status for a ticket
        updateStatus: function ($ticketId, ticketData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'PUT',
                url: apiUrl + '/ticket/' + $ticketId + '/status',
                headers: {'Content-Type': 'application/json'},
                data: ticketData
            });
        },

        // update the assignee for a ticket
        updateAssignee: function ($ticketId, ticketData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'PUT',
                url: apiUrl + '/ticket/' + $ticketId + '/assignee',
                headers: {'Content-Type': 'application/json'},
                data: ticketData
            });
        }
    }

});