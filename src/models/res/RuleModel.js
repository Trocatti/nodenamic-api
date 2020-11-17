const { Schema, model } = require('mongoose');

const databaseLoadOperation = {
    aggregate: {
        default: () => undefined,
        type: [Schema.Types.Mixed],
    },
    bucket: String,
    fact_name: String,
    restriction: Schema.Types.Mixed,
};

const RuleModel = new Schema(
    {
        dependencies: [{
            dependency_load_operation: databaseLoadOperation,
            operation: [{
                enumValues: ['SEARCH', 'DELETE', 'CREATE', 'UPDATE'],
                type: String,
            }],
            remote_dependency_load_operation: {
                body: Schema.Types.Mixed,
                conversion_method: Schema.Types.Function,
                fact_name: String,
                method: {
                    enumValues: ['SEARCH', 'DELETE', 'CREATE', 'UPDATE'],
                    type: String,
                },
                single_resource: Boolean,
                url: String,
            },
        }],
        fact_name: String,
        focus_group: String,
        include_fact: Boolean,
        rule_package: {
            of: String,
            type: Map,
        },
        self_load_operation: databaseLoadOperation,
    }
);

module.exports = model('RuleSchema', RuleModel, '_rules');
