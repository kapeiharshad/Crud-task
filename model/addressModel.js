const address = require("../schema/address");

module.exports = {
  saveAddress: (reqData, callback) => {
    let addressSave = new address(reqData);
    addressSave.save((err, savedData) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, savedData);
      }
    });
  }
};
