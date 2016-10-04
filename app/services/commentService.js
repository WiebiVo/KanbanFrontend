/**
 * Created by Wiebke on 12.06.16.
 */
angular.module('commentService', []).factory('Comment', function ($http, envService) {

    return {
        // get comments for ticketId
        byTicketId: function ($ticketId) {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/ticket/' + $ticketId + '/comments');
        },

        // create a comment
        saveComment: function (commentData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'POST',
                url: apiUrl + '/create/comment',
                headers: {'Content-Type': 'application/json'},
                data: commentData
            });

        }
    }

});