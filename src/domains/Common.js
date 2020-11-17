const ObjectID = require("mongodb").ObjectID;

module.exports = {
  newTemplateId(name) {
    // TODO Ajustar replace para não ser um palavra fixa
    const templateId = "TEMPLATE_ID";
    const newTemplateId = `${name.toUpperCase()}_ID`;
    return { templateId, newTemplateId };
  },

  replaceAnyNotWordCharacter(value) {
    return value.replace(/\W+/g, "");
  },

  replaceIfNotStarWithtBar(value) {
    return value.replace(/^(?![/])/g, "/");
  },

  replaceToLowerCase(value) {
    return value.toLowerCase();
  },

  defineProperty(_object, key, value) {
    Object.defineProperty(_object, key, {
      enumerable: true,
      configurable: true,
      writable: true,
      value: value
    });
  },

  cleanAndTransformToEnumerator(_string) {
    const solvedEnum = _string
      .replace(/\n/g, "")
      .replace(/ /g, "")
      .replace(/;+/g, ";")
      .split(";");
    const uniqueItems = solvedEnum.filter(
      (value, index) => solvedEnum.indexOf(value) === index
    );
    return uniqueItems;
  },

  // tem filho mas nao é filho (root node with leaf node) /vacinas/*
  templatesRootStructure(objects) {
    const { schemas, resources, operations, routes } = objects;

    return {
      schema: schemas.rootNode,
      resource: resources.rootNode,
      operation: operations.rootStructure.rootNode,
      route: routes.rootStructure.parentNode,
      child: {
        create: schemas.create,
        update: schemas.update,
        operation: operations.rootStructure.childNode,
        route: routes.rootStructure.childNode
      },
    };
  },

  // é filho e terá filhos (parent node) */vacinas/*
  templatesParentStructure(objects) {
    const { schemas, resources, operations, routes } = objects;

    return {
      schema: schemas.rootNode,
      resource: resources.rootNode,
      operation: operations.parentStructure.parentNode,
      route: routes.parentStructure.parentNode,
      child: {
        create: schemas.create,
        update: schemas.update,
        operation: operations.parentStructure.childNode,
        route: routes.parentStructure.childNode
      },
    };
  },

  // é filho e não terá filhos (leaf node) */vacinas
  templatesLeafStructure(objects) {
    const { schemas, resources, operations, routes } = objects;

    return {
      schema: schemas.rootNode,
      resource: resources.rootNode,
      operation: operations.leafStructure.parentNode,
      route: routes.leafStructure.parentNode,
      child: {
        create: schemas.create
      },
    };
  },

  // não é filho e não tem filhos (root node) /vacina
  templatesDefault(objects) {
    const { schemas, resources, operations, routes } = objects;

    return {
      schema: schemas.rootNode,
      resource: resources.rootNode,
      operation: operations.rootStructure.rootNode,
      route: routes.rootStructure.parentNode
    };
  },

  copyObject(object) {
    return JSON.parse(JSON.stringify(object));
  },

  objectID(id) {
    return new ObjectID(id);
  }
}