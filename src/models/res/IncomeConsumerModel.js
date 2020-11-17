const { Schema, model } = require('mongoose');

const IncomeConsumerModel = new Schema(
    {
        adjusters: [{
            for_each: String,
            methods: {
                enumValues: ['UPDATE', 'CREATE'],
                type: String,
            },
            operation: {
                add_field: {
                    name: String,
                    query_command: {
                        aggregate: [{
                            type: Schema.Types.Mixed,
                        }],
                        bucket: String,
                        default_value: Object,
                        restriction: {
                            type: Schema.Types.Mixed,
                        },
                        single_return: Boolean,
                    },
                    type: String,
                    value: String,
                },
                remove_field: {
                    name: String,
                },
            },
            order: Number,
        }],
        databaseRestriction: {
            aggregate: [{
                type: Schema.Types.Mixed,
            }],
            restriction: {
                type: Schema.Types.Mixed,
            },
        },
        notFoundOperation: {
            replaceFor: Schema.Types.Mixed,
        },
        operationSchema: {
            ref: 'Schema',
            type: Schema.Types.ObjectId,
        },
        outputQueues: [{
            ref: 'QueueSchema',
            type: Schema.Types.ObjectId,
        }],
        resource: {
            ref: 'ResourceSchema',
            required: true,
            type: Schema.Types.ObjectId,
        },
        ruleConfig: {
            ref: 'RuleSchema',
            type: Schema.Types.ObjectId,
        },
        security: {
            restrictions: {
                access_condition: {
                    type: Schema.Types.Mixed,
                },
                create_condition: {
                    conditions: [{
                        bucket: String,
                        validation: {
                            type: Schema.Types.Mixed,
                        },
                    }],
                    validation_stategy: {
                        enumValues: ["ANY", "ALL"],
                        type: String,
                    },
                },
                delete_condition: {
                    conditions: [{
                        bucket: String,
                        validation: {
                            type: Schema.Types.Mixed,
                        },
                    }],
                    validation_stategy: {
                        enumValues: ["ANY", "ALL"],
                        type: String,
                    },
                },
                update_condition: {
                    conditions: [{
                        bucket: String,
                        validation: {
                            type: Schema.Types.Mixed,
                        },
                    }],
                    validation_stategy: {
                        enumValues: ["ANY", "ALL"],
                        type: String,
                    },
                },
            },
            roles: [{
                allowed_roles: [{
                    type: String,
                    uppercase: true,
                }],
                validate_for: [{
                    enumValues: ['SEARCH', 'UPDATE', 'DELETE', 'CREATE'],
                    type: String,
                }],
            }],
        },
    }
);

module.exports = model('IncomeConsumerSchema', IncomeConsumerModel, '_income_consumer');
