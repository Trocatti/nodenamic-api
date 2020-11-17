// require packages
const Koa = require('koa');
const Router = require('koa-router');
const BodyParser = require("koa-bodyparser");
const Cors = require('@koa/cors');
const Logger = require('koa-logger');
const jwt = require('./jwt');
const startMongo = require('./mongoose');
const properties = require('./properties');
const compress = require('./compress');
const createRoutes = require('../routes/routes');

// init
const server = new Koa();

// properties from server
const { port, host, path, version } = properties.api;

// init
const router = new Router({
    prefix: `${path}${version}` // /api/v1
});

const { prefix } = router.opts;

module.exports = () => {

    // start mongodb
    startMongo();

    // compress
    compress(server);

    // create routes
    createRoutes(router);

    // middlwares
    server
        .use(Logger())
        .use(Cors())
        .use(BodyParser())
        .use(router.routes())
        .use(router.allowedMethods())
        .use(jwt);

    // start api
    server.listen(port, host, error => {
        if (error) console.log('\x1b[41m%s\x1b[0m', '[Koa] Unable to listen for connections', error);
        console.log('\x1b[36m%s\x1b[0m', '[Koa] Server listening on', `http://${host}:${port}${prefix}`);
    });

};