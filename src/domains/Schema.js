const { replaceAnyNotWordCharacter, replaceToLowerCase, copyObject, defineProperty, cleanAndTransformToEnumerator } = require('./Common');

module.exports = {
  create: (schema, name, fields) => {
    const objectSchema = copyObject(schema);
    const newName = replaceAnyNotWordCharacter(name);
    // TODO Ajustar replace para não ser um palavra fixa
    const newTitle = objectSchema.title.replace("Template", newName);
    const newRefId = objectSchema["&id"].replace(
      "template",
      replaceToLowerCase(newName)
    );

    const patch = objectSchema["&patch"];
    if (patch) {
      const ref = patch.source["&ref"];
      const newPatchRef = ref.replace("template", replaceToLowerCase(newName));
      objectSchema["&patch"].source["&ref"] = newPatchRef;
    }

    objectSchema.title = newTitle;
    objectSchema["&id"] = newRefId;

    objectSchema.required = fields
      .filter(item => !!item.required)
      .map(filtered => filtered.name);

    fields.forEach(item => {
      const _type = item.type.toLowerCase();
      item.type = _type;

      let fieldObject = {};

      if (item.referenceField) {
        defineProperty(fieldObject, "&ref", item.referenceField);
      } else {
        if (item.type == "array") {
          defineProperty(fieldObject, "items", item.arrayDefinitions);
        } else if (item.enum) {
          defineProperty(
            fieldObject,
            "enum",
            cleanAndTransformToEnumerator(item.enum)
          );
          return;
        } else {
          const keysToRemove = [
            "id",
            "name",
            "restriction",
            "required",
            "enum",
            "arrayDefinitions"
          ];

          const keys = Object.keys(item).filter(
            item => !keysToRemove.includes(item)
          );

          keys.forEach(key => {
            if (item[key] != null) {
              defineProperty(fieldObject, key, item[key]);
            }
          });
        }
        if (objectSchema.properties) {
          defineProperty(objectSchema.properties, item.name, fieldObject);
        }
      }
    });

    return { content: objectSchema };
  }
}