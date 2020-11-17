const { copyObject, objectID, newTemplateId } = require("./Common");

module.exports = {
  create: (operation, schema, resource) => {
    const objectOperation = copyObject(operation);

    objectOperation.operationSchema = objectID(schema.id);
    objectOperation.resource = objectID(resource.id);

    return objectOperation;
  },

  createChild: (operation, schema, resource, name) => {
    const objectOperation = copyObject(operation);
    const { templateId, _newTemplateId } = newTemplateId(name);

    objectOperation.databaseRestriction.restriction._id = objectOperation.databaseRestriction.restriction._id.replace(
      templateId,
      _newTemplateId
    );

    objectOperation.operationSchema = objectID(schema._id);
    objectOperation.resource = objectID(resource._id);

    return objectOperation;
  },
}