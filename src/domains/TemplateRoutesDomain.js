const Operation = require("./Operation");
const Resource = require("./Resource")
const Route = require("./Route")
const Schema = require("./Schema")
const Template = require("./Template")

module.exports = {
  newSchemas: (schema, name, fields) => {
    return Schema.create(schema, name, fields);
  },

  newResources: (resource, bucket) => {
    return Resource.create(resource, bucket);
  },

  newOperations: (operation, schema, resource) => {
    return Operation.create(operation, schema, resource);
  },

  newRoutes: (route, operation, path, version, fields) => {
    return Route.create(route, operation, path, version, fields);
  },

  newOperationsChild: (operation, schema, resource, name) => {
    return Operation.createChild(operation, schema, resource, name);
  },

  newRoutesChild: (routeFather, routeChild, operationChild, name) => {
    return Route.createChild(routeFather, routeChild, operationChild, name);
  },

  newTemplates: (params, objects) => {
    return Template.create(params, objects);
  }
};
