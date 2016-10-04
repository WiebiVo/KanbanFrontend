/**
 * Created by Wiebke on 12.06.16.
 */
angular.module('boardService', []).factory('Board', function ($http, envService) {

    return {
        // get board
        boards: function () {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/boards');
        },

        // get tickets by status from board
        byStatus: function ($boardId) {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/board/' + $boardId + '/tickets/by/status');

        },

        // create a board
        saveBoard: function (boardData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'POST',
                url: apiUrl + '/create/board',
                headers: {'Content-Type': 'application/json'},
                data: boardData
            });

        }
    }

});