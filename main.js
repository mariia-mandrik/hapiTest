'use strict';
var a = require('./a.json')
const Hapi = require('@hapi/hapi');
const fetch = require('node-fetch');


const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
            path: '/test',
            handler: (request, h) => {

            return a.a;
        }
    });
    server.route({
        method: 'GET',
        path: '/rrr',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });
    server.route({
        method: 'GET',
        path: '/github',
        handler: (request, h) => {
            console.log(request.query.name)
            return fun(request.query.name);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});



init();

async function fun(name) {
    let response = await fetch(`https://api.github.com/users/${name}`);
    let user = await response.json();
    return user
}