const SchemaController = require("../../controllers/res/SchemaController");

const path = '/schemas';
module.exports = router => {

    router
        .get(path + '/:id', async ctx => {
            ctx.body = await SchemaController.findOne(ctx.params.id);
        });

};
