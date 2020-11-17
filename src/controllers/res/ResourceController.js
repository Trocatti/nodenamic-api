const ObjectID = require("mongodb").ObjectID;
const ResourceModel = require('../../models/res/ResourceModel');

module.exports = {

    findOne: async id => {
        return await ResourceModel.findById({ "_id": ObjectID(id) });
    }

};
