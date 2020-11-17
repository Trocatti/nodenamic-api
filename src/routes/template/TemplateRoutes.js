const TemplateRoutesController = require("../../controllers/template/TemplateRoutesController");

const path = '/create';
module.exports = router => {

    router
        .get(path + '/defs', async ctx => {
            ctx.body = await TemplateRoutesController.findDefs();
        })
        .get(path + '/', async ctx => {
            ctx.body = await TemplateRoutesController.find(ctx.request.body);
        })
        .post(path + '/', async ctx => {
            ctx.body = await TemplateRoutesController.create(ctx.request.body);
        })
        .put(path + '/', async ctx => {
            ctx.body = await TemplateRoutesController.update(ctx.request.body);
        });

};
