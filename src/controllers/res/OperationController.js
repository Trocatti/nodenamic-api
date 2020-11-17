const ObjectID = require("mongodb").ObjectID;
const OperationModel = require('../../models/res/OperationModel');

module.exports = {

    findOne: async id => {
        return await OperationModel.findById({ "_id": ObjectID(id) });
    }

};
