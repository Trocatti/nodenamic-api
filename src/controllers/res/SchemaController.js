const ObjectID = require("mongodb").ObjectID;
const SchemaModel = require('../../models/res/SchemaModel');

module.exports = {

    findOne: async id => {
        return await SchemaModel.findById({ "_id": ObjectID(id) });
    }

};
