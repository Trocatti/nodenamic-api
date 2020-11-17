const { Schema, model } = require('mongoose');

const SchemaModel = new Schema(
    {
        content: {
            type: Schema.Types.Mixed
        }
    }
);

module.exports = model('Schema', SchemaModel, '_schema');
