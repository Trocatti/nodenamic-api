const OperationController = require("../../controllers/res/OperationController");

const path = '/operations';
module.exports = router => {

    router
        .get(path + '/:id', async ctx => {
            ctx.body = await OperationController.findOne(ctx.params.id);
        });
};
