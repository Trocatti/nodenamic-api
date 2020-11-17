const TemplateRoutesService = require('../../services/TemplateRoutesService');

module.exports = {

    findDefs: async () => {
        return await TemplateRoutesService.findDefs();
    },

    find: async params => {
        return await TemplateRoutesService.find(params.child);
    },

    create: async params => {
        const templates = await TemplateRoutesService.find(params);
        return await TemplateRoutesService.create(params, templates);
    },

    update: async params => {
        return await TemplateRoutesService.update(params);
    }

};
