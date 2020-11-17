const mongoose = require('mongoose');
const properties = require('./properties');

const { port, host, db } = properties.mongo;
const mongoURL = `mongodb://${host}:${port}/${db}`;
const options = {
    keepAlive: true,
    reconnectTries: 5,
    reconnectInterval: 500,
    poolSize: 5,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
};

module.exports = async () => {

    await mongoose.connect(mongoURL, options)
        .then(db => console.log('\x1b[36m%s\x1b[0m', `[Mongoose][_v: ${db.version}] Connected to the database`, db.connection.name))
        .catch(err => console.log('\x1b[41m%s\x1b[0m', `[Mongoose][_v: ${db.version}] Error connecting to database`, err));

};
