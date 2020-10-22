const address = require("../schema/address");
const isEmpty = require("lodash.isempty");

module.exports = {
  saveAddress: (reqData, callback) => {
    if (isEmpty(reqData)) {
      callback("Please provide proper request data", null);
    } else {
      let addressSave = new address(reqData);
      addressSave.save((err, savedData) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, savedData);
        }
      });
    }
  }
};
