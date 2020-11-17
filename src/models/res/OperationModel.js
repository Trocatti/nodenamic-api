const { Schema, model } = require('mongoose');

const OperationModel = new Schema(
    {
        adjusters: [{
            for_each: String,
            methods: [{
                enumValues: ['UPDATE', 'CREATE'],
                type: String,
            }],
            operation: {
                condition: [{
                    condition: {
                        type: String,
                        enumValues: ['MISSING', 'PRESENT'],
                    },
                    fields: [String],
                }],
                add_field: {
                    name: String,
                    query_command: {
                        aggregation: {
                            // Workaround to not create the field when dosen't exist value in aggregate
                            // https://github.com/Automattic/mongoose/issues/1335
                            default: () => undefined,
                            type: [Schema.Types.Mixed],
                        },
                        bucket: String,
                        condition: {
                            type: Schema.Types.Mixed
                        },
                        default_value: Object,
                        single_return: Boolean
                    },
                    type_of_field: String,
                    value: String
                },
                remove_field: {
                    name: String,
                }
            },
            order: Number
        }],
        databaseRestriction: {
            aggregate: [{
                type: Schema.Types.Mixed
            }],
            restriction: {
                type: Schema.Types.Mixed
            }
        },
        notFoundOperation: {
            replaceFor: Schema.Types.Mixed
        },
        operationSchema: {
            ref: 'Schema',
            type: Schema.Types.ObjectId
        },
        outputQueues: [{
            accept: Schema.Types.Mixed, // Object that gonna be allowed in the the message queue
            actions: {
                enumValues: ['DELETE', 'CREATE', 'UPDATE'],
                type: String,
            },
            queue: {
                ref: 'QueueSchema',
                type: Schema.Types.ObjectId,
            },
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
                    enumValues: ['SEARCH', 'DELETE', 'CREATE', 'UPDATE'],
                    type: String,
                }],
            }],
        },
        singleResource: Boolean,
    }
);

module.exports = model('OperationSchema', OperationModel, '_operation');
