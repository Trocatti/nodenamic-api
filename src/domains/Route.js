const { replaceToLowerCase, replaceIfNotStarWithtBar, replaceAnyNotWordCharacter, objectID, defineProperty, newTemplateId, copyObject } = require("./Common");

module.exports = {
  create: (route, operation, path, version, fields) => {
    const objectRoute = copyObject(route);
    const newPath = replaceToLowerCase(
      replaceIfNotStarWithtBar(
        replaceAnyNotWordCharacter(
          path
        )
      )
    );

    objectRoute.operation = objectID(operation._id);
    objectRoute.path = newPath;
    objectRoute.version = version;

    const fieldsWithRestriction = fields.filter(
      item => item.restriction != null && item.restriction != "n/a"
    );

    let parametersObject = {};
    fieldsWithRestriction.forEach(item => {
      const fieldObject = {
        field: item.name,
        validation: {
          type: item.type
        },
        restriction: item.restriction
      };

      defineProperty(parametersObject, item.name, fieldObject);
    });

    if (parametersObject) {
      objectRoute.parameters = parametersObject;
    }

    return objectRoute;
  },

  createChild: (routeFather, routeChild, operationChild, name) => {
    const objectRoute = copyObject(routeChild);
    const { templateId, _newTemplateId } = newTemplateId(name);
    const newPath = objectRoute.path.replace(templateId, _newTemplateId);
    const parameters = objectRoute.parameters[templateId];

    objectRoute.parameters[templateId].field = _newTemplateId;
    objectRoute.parameters[_newTemplateId] = parameters;
    delete objectRoute.parameters[templateId];

    objectRoute.operation = objectID(operationChild._id);
    objectRoute.parent.route = objectID(routeFather._id);
    objectRoute.path = newPath;

    return objectRoute;
  },
}