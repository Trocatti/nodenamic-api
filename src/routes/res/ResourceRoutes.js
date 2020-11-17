const ResourceController = require("../../controllers/res/ResourceController");

const path = '/resources';
module.exports = router => {

    router
        .get(path + '/:id', async ctx => {
            ctx.body = await ResourceController.findOne(ctx.params.id);
        });

};
