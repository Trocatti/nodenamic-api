const { Schema, model } = require('mongoose');

const EngineOutcomeModel = new Schema(
    {
        fact_name: String,
        internal: {
            default: true,
            type: Boolean,
        },
        url_operation: {
            of: String,
            type: Map,
        },
        version: Number,
    }
);

module.exports = model('EngineOutcomeSchema', EngineOutcomeModel, '_engine_outcomes');
