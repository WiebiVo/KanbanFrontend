/**
 * Created by Wiebke on 12.06.16.
 */
angular.module('userService', []).factory('User', function ($http, envService) {

    return {

        // get all user
        users: function () {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/users');
        },

        currentUser: function() {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/user/current');
        },

        // get all boards for a user
        byBoardId: function ($boardId) {
            var apiUrl = envService.read('apiUrl');
            return $http.get(apiUrl + '/board/' + $boardId + '/users');
        },

        // create a user
        saveUser: function (userData) {
            var apiUrl = envService.read('apiUrl');
            return $http({
                method: 'POST',
                url: apiUrl + '/create/user',
                headers: {'Content-Type': 'application/json'},
                data: userData
            });
        }

    }

});
