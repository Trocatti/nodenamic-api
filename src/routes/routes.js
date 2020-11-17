const SchemaRoutes = require('./res/SchemaRoutes');
const ResourceRoutes = require('./res/ResourceRoutes');
const OperationRoutes = require('./res/OperationRoutes');
const RouteRoutes = require('./res/RouteRoutes');

const TemplateRoutes = require('./template/TemplateRoutes');

module.exports = router => {

    SchemaRoutes(router);
    ResourceRoutes(router);
    OperationRoutes(router);
    RouteRoutes(router);

    TemplateRoutes(router);

};
