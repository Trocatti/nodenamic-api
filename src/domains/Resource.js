const { copyObject, replaceToLowerCase, replaceAnyNotWordCharacter } = require("./Common");

module.exports = {
  create: (resource, bucket) => {
    const objectResource = copyObject(resource);

    objectResource.database_operation.bucket = replaceToLowerCase(bucket);
    objectResource.resource = replaceAnyNotWordCharacter(bucket).toUpperCase();

    return objectResource;
  },
}