/**
 * Created by adron on 11/1/15.
 * Description: A simple starter server.js file for hapi.js.
 */

var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path: '/hello',
    handler: function (request, reply) {
        reply('hello world');
    }
});

// Start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});