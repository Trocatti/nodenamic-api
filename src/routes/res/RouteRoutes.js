const RouteController = require("../../controllers/res/RouteController");

const path = '/routes';
module.exports = router => {

    router
        .get(path + '/:id', async ctx => {
            ctx.body = await RouteController.findOne(ctx.params.id);
        });

};
