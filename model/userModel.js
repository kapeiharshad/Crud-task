const user = require("../schema/user");
const waterfall = require("async/waterfall");

module.exports = {
  saveUser: (reqData, callback) => {
    waterfall(
      [
        function (callback) {
          user
            .findOne({}, { userId: 1 })
            .sort({ _id: -1 })
            .exec((err, foundedData) => {
              if (err) {
                callback(err, null);
              } else if (!foundedData) {
                callback(null, { userId: 1 });
              } else {
                callback(null, { userId: foundedData.userId + 1 });
              }
            });
        },
        function (wf1Data, callback) {
          let userSave = new user(reqData);
          userSave.userId = wf1Data.userId;
          userSave.save((err, savedData) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, savedData);
            }
          });
        }
      ],
      (err, finalData) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, finalData);
        }
      }
    );
  },
  getAllUser: (callback) => {
    user.find({}).exec((err, foundedData) => {
      if (err) {
        callback(err, null);
      } else if (!foundedData) {
        callback(null, "No data found");
      } else {
        callback(null, foundedData);
      }
    });
  }
};
