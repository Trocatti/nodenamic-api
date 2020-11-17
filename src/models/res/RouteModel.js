const { Schema, model } = require('mongoose');

const RouteModel = new Schema(
    {
        methods: [{
            enumValues: ['SEARCH', 'DELETE', 'CREATE', 'UPDATE'],
            type: String,
        }],
        operation: {
            ref: 'OperationSchema',
            type: Schema.Types.ObjectId,
        },
        parameters: {
            type: Schema.Types.Mixed
        },
        parent: {
            route: {
                ref: 'RouteSchema',
                type: Schema.Types.ObjectId
            },
            validateAccess: {
                type: Boolean,
            },
            validateExistence: {
                type: Boolean,
            },
        },
        path: {
            maxlength: 100,
            required: true,
            type: String,
        },
        version: {
            type: Number,
        }
    }
);

module.exports = model('RouteSchema', RouteModel, '_routes');
