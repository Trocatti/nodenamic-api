const TemplateRoutesDomain = require("../domains/TemplateRoutesDomain");
const TemplateModel = require("../models/template/TemplateModel");
const SchemaModel = require("../models/res/SchemaModel");
const ResourceModel = require("../models/res/ResourceModel");
const OperationModel = require("../models/res/OperationModel");
const RouteModel = require("../models/res/RouteModel");

module.exports = {
  findDefs: async () => {
    const filter = { "content.definitions": "$content.definitions" };
    const { content } = await TemplateModel.findOne({ type: "route" }, filter);

    return content.definitions;
  },

  find: async params => {
    const { content: templates } = await TemplateModel.findOne({
      type: "route"
    });

    return _newTemplates(params, templates);
  },

  // TODO Refatorar esse método, onde que cada parte tenha seu próprio service: SchemaService, etc...
  create: async (params, templates) => {
    const { name, bucket, path, version, hasChild, isChild, fields } = params;

    const {
      schema: schemaTemplate,
      resource: resourceTemplate,
      operation: operationTemplate,
      route: routeTemplate
    } = templates;

    const {
      operation: operationChildTemplate,
      route: routeChildTemplate,
      create: schemaCreateTemplate,
      update: schemaUpdateTemplate
    } = templates.child || {};

    let newEndpoints = { child: { schema: {} } };

    try {
      const newSchemaRoot = await _newSchemas(schemaTemplate, name, fields);
      newEndpoints.schema = newSchemaRoot._id;
      console.log("[Create Schema Root]", newSchemaRoot);

      let newSchemaCreate = {};
      if (hasChild || isChild) {
        newSchemaCreate = await _newSchemas(schemaCreateTemplate, name, fields);
        newEndpoints.child.schema.create = newSchemaCreate._id;
        console.log(
          "[Create Schema Create]",
          newSchemaCreate,
          "[hasChild]",
          hasChild,
          "[isChild]",
          isChild
        );
      }

      const newResource = await _newResources(resourceTemplate, bucket);
      newEndpoints.resource = newResource._id;
      console.log("[Create Resource Root]", newResource);

      const newOperation = await _newOperations(
        operationTemplate,
        newSchemaRoot,
        newResource
      );
      newEndpoints.operation = newOperation._id;
      console.log("[Create Operation Root]", newOperation);

      const newRoute = await _newRoutes(
        routeTemplate,
        newOperation,
        path,
        version,
        fields
      );
      newEndpoints.route = newRoute._id;
      console.log("[Create Route Root]", newRoute);

      let newSchemaUpdate = {};
      let newOperationChild = {};
      let newRouteChild = {};
      if (hasChild) {
        newSchemaUpdate = await _newSchemas(schemaUpdateTemplate, name, fields);
        newEndpoints.child.schema.update = newSchemaUpdate._id;
        console.log("[Create Schema Update]", newSchemaUpdate);

        newOperationChild = await _newOperationsChild(
          operationChildTemplate,
          newSchemaUpdate,
          newResource,
          name
        );
        newEndpoints.child.operation = newOperationChild._id;
        console.log("[Create Operation Child]", newOperationChild);

        newRouteChild = await _newRoutesChild(
          newRoute,
          routeChildTemplate,
          newOperationChild,
          name
        );
        newEndpoints.child.route = newRouteChild._id;
        console.log("[Create Route Child]", newRouteChild);
      }

      return newEndpoints;
    } catch (error) {
      await _deleteSchemas(newEndpoints);
      await _deleteResources(newEndpoints);
      await _deleteOperations(newEndpoints);
      await _deleteRoutes(newEndpoints);

      console.log(error || error.message);

      return { msgerror: error.message || "Favor contatar o administrador." };
    }
  },

  update: async params => {
    const { objects, isChild, hasChild } = params;
    const { routes, operations, resources, schemas } = objects;

    await SchemaModel.findByIdAndUpdate(schemas._id, schemas);

    if (hasChild) {
      const { schemas_create } = objects;

      await SchemaModel.findByIdAndUpdate(schemas_create._id, schemas_create);
    }

    await ResourceModel.findByIdAndUpdate(resources._id, resources);
    await OperationModel.findByIdAndUpdate(operations._id, operations);
    await RouteModel.findByIdAndUpdate(routes._id, routes);

    if (hasChild) {
      const { routes_child, operations_child, schemas_update } = objects;

      await SchemaModel.findByIdAndUpdate(schemas_update._id, schemas_update);
      await OperationModel.findByIdAndUpdate(
        operations_child._id,
        operations_child
      );
      await RouteModel.findByIdAndUpdate(routes_child._id, routes_child);

      return routes.path + routes_child.path;
    }

    return routes.path;
  }
};

async function _deleteResources(newEndpoints) {
  if (newEndpoints.resource) {
    await ResourceModel.findByIdAndDelete(newEndpoints.resource);
  }
}

async function _deleteRoutes(newEndpoints) {
  if (newEndpoints.route) {
    await RouteModel.findByIdAndDelete(newEndpoints.route);
  }
  if (newEndpoints.child && newEndpoints.child.route) {
    await RouteModel.findByIdAndDelete(newEndpoints.child.route);
  }
}

async function _deleteOperations(newEndpoints) {
  if (newEndpoints.operation) {
    await OperationModel.findByIdAndDelete(newEndpoints.operation);
  }
  if (newEndpoints.child && newEndpoints.child.operation) {
    await OperationModel.findByIdAndDelete(newEndpoints.child.operation);
  }
}

async function _deleteSchemas(newEndpoints) {
  if (newEndpoints.schema) {
    await SchemaModel.findByIdAndDelete(newEndpoints.schema);
  }
  if (newEndpoints.child && newEndpoints.child.schema) {
    if (newEndpoints.child.schema.create) {
      await SchemaModel.findByIdAndDelete(newEndpoints.child.schema.create);
    }
    if (newEndpoints.child.schema.update) {
      await SchemaModel.findByIdAndDelete(newEndpoints.child.schema.update);
    }
  }
}

async function _newRoutesChild(
  routeFather,
  routeChild,
  newOperationChild,
  name
) {
  const newObjectRoute = await TemplateRoutesDomain.newRoutesChild(
    routeFather,
    routeChild,
    newOperationChild,
    name
  );
  return await RouteModel.create(newObjectRoute);
}

async function _newOperationsChild(
  operationChild,
  newSchema,
  newResource,
  name
) {
  const newObjectOperation = await TemplateRoutesDomain.newOperationsChild(
    operationChild,
    newSchema,
    newResource,
    name
  );
  return await OperationModel.create(newObjectOperation);
}

async function _newRoutes(route, newOperation, path, version, fields) {
  const newObjectRoute = await TemplateRoutesDomain.newRoutes(
    route,
    newOperation,
    path,
    version,
    fields
  );
  return await RouteModel.create(newObjectRoute);
}

async function _newOperations(operation, newSchema, newResource) {
  const newObjectOperation = await TemplateRoutesDomain.newOperations(
    operation,
    newSchema,
    newResource
  );
  return await OperationModel.create(newObjectOperation);
}

async function _newResources(resource, bucket) {
  const newObjectResource = await TemplateRoutesDomain.newResources(
    resource,
    bucket
  );
  return await ResourceModel.create(newObjectResource);
}

async function _newSchemas(schema, name, fields) {
  const newObjectSchema = await TemplateRoutesDomain.newSchemas(
    schema,
    name,
    fields
  );
  return await SchemaModel.create(newObjectSchema);
}

async function _newTemplates(params, objects) {
  return await TemplateRoutesDomain.newTemplates(params, objects);
}
