
// this is the server side part of http://helpjim.me/save/the/world/
// to realize the multi-player part
var ws = require("nodejs-websocket")

var connections = [];

var notifyAllListener = function(msg) {
    for (var i=0; i<connections.length; i++) {
        connections[i].sendText(msg);
    }
};

var server = ws.createServer(function (conn) {

    // keep track of the connection
    connections.push(conn);

    // notify all connected browsers about the change
    notifyAllListener('/helpers/potential/' + connections.length);

    conn.on("text", function (str) {
        if (str === '/countdown/reset') {
            notifyAllListener(str);
        } else if(str === '/helpers/potential') {
            conn.sendText('/helpers/potential/' + connections.length);
        }
    })
    conn.on("close", function (code, reason) {
        // remove the connection from the collection
        for (var i=0; i<connections.length; i++) {
            if (connections[i] === conn) {
                connections.splice(i, 1);
            }
        }
        // notify all connected browsers about the change
        notifyAllListener('/helpers/potential/' + connections.length);
    })
}).listen(8001)
