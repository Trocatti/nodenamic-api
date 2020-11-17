const { Schema, model } = require('mongoose');

const ResourceModel = new Schema(
    {
        database_operation: {
            bucket: {
                required: true,
                type: String,
            },
            field: String,
            single_resource: Boolean,
        },
        resource: {
            index: {
                unique: true,
            },
            maxlength: 50,
            minlength: 3,
            required: true,
            type: String,
        },
        resource_schema: {
            ref: 'Schema',
            type: Schema.Types.ObjectId,
        },
        rule_config: {
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
                    enumValues: ['SEARCH', 'UPDATE', 'CREATE', 'DELETE'],
                    type: String,
                }],
            }],
        }
    }
);

module.exports = model('ResourceSchema', ResourceModel, '_resources');
