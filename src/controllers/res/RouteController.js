const ObjectID = require("mongodb").ObjectID;
const RouteModel = require('../../models/res/RouteModel');

module.exports = {

    findOne: async id => {
        return await RouteModel.findById({ "_id": ObjectID(id) });
    }

};
