const { templatesRootStructure, templatesLeafStructure, templatesParentStructure, templatesDefault } = require("./Common");

module.exports = {
  create: (params, objects) => {
    const { isChild, hasChild } = params;

    let newTemplate = {};

    if (!isChild && hasChild) {
      newTemplate = templatesRootStructure(objects);
    } else if (isChild && !hasChild) {
      newTemplate = templatesLeafStructure(objects);
    } else if (isChild && hasChild) {
      newTemplate = templatesParentStructure(objects);
    } else {
      newTemplate = templatesDefault(objects);
    }

    return newTemplate;
  }
}