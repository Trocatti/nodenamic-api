const jwt = require("koa-jwt");
const SECRET = require('./properties').api.secret;
const jwtInstance = jwt({ secret: SECRET });

module.exports = jwtInstance;