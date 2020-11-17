const { Schema, model } = require('mongoose');

const TemplateModel = new Schema(
    {
        type: {
            type: String,
            enumValues: ['schema', 'resource', 'operation', 'routes']
        },
        child: Boolean,
        content: {
            type: Schema.Types.Mixed,
            riquered: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('TemplateSchema', TemplateModel, '_templates');
