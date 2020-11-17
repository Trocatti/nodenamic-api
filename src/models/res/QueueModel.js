const { Schema, model } = require('mongoose');

const QueueModel = new Schema(
    {
        connectionInfo: {
            login: String,
            password: String,
            url: String,
        },
        queueName: String
    }
);

module.exports = model('QueueSchema', QueueModel, '_queues');
