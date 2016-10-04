/**
 * Created by Wiebke on 12.06.16.
 */
angular.module('teamWork').factory('messages', function($websocket) {

    var ws = $websocket('ws://localhost:8080');
    var collection = [];

    ws.onError(function(event) {
        console.log('connection Error', event);
    });

    ws.onClose(function(event) {
        console.log('connection closed', event);
    });

    ws.onOpen(function() {
        console.log('connection open');
    });

    return {
        collection: collection,
        status: function() {
            return ws.readyState;
        },
        get: function() {
            return ws;
        },
        send: function(message) {
            if (angular.isString(message)) {
                ws.send(message);
            }
            else if (angular.isObject(message)) {
                ws.send(JSON.stringify(message));
            }
        }

    };
})