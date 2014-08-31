
// this is the server side part of http://helpjim.me/save/the/world/
// to realize the multi-player part
var ws = require("nodejs-websocket")

var connections = [];

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    connections.push(conn);
    conn.on("text", function (str) {
        if (str === '/countdown/reset') {
            for (var i=0; i<connections.length; i++) {
                connections[i].sendText(str);
                console.log('notifying connection');
            }
        } else if(str === '/helpers/potential') {
            conn.sendText(connections.length);
        }
    })
    conn.on("close", function (code, reason) {
        for (var i=0; i<connections.length; i++) {
            if (connections[i] === conn) {
                connections.splice(i, 1);
            }
        }
    })
}).listen(8001)
