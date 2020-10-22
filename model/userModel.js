const user = require("../schema/user");
const waterfall = require("async/waterfall");
const isEmpty = require("lodash.isempty");

module.exports = {
  saveUser: (reqData, callback) => {
    if (isEmpty(reqData)) {
      callback("Please provide proper request data", null);
    } else {
      waterfall(
        [
          function (callback) {
            user
              .findOne({}, { userId: 1 })
              .sort({ _id: -1 })
              .exec((err, foundedData) => {
                if (err) {
                  callback(err, null);
                } else if (isEmpty(foundedData)) {
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
    }
  },
  getAllUser: (callback) => {
    user.find({}).exec((err, foundedData) => {
      if (err) {
        callback(err, null);
      } else if (isEmpty(foundedData)) {
        callback(null, "No data found");
      } else {
        callback(null, foundedData);
      }
    });
  },
  getOneUser: (reqData, callback) => {
    if (isEmpty(reqData)) {
      callback("Please provide proper request data", null);
    } else {
      user.findOne({ userId: reqData.userId }).exec((err, foundedData) => {
        if (err) {
          callback(err, null);
        } else if (isEmpty(foundedData)) {
          callback(null, "No data found");
        } else {
          callback(null, foundedData);
        }
      });
    }
  },
  updateAllUser: (reqData, callback) => {
    if (isEmpty(reqData)) {
      callback("Please provide proper request data", null);
    } else {
      user.updateMany({}, reqData).exec((err, updatedData) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, updatedData);
        }
      });
    }
  },
  updateOneUser: (reqParam, reqData, callback) => {
    if (isEmpty(reqParam) && isEmpty(reqData)) {
      callback("Please provide proper request data", null);
    } else {
      user
        .updateOne({ userId: reqParam.userId }, reqData)
        .exec((err, updatedData) => {
          if (err) {
            callback(err, null);
          } else {
            callback(null, updatedData);
          }
        });
    }
  },
  deleteAllUser: (callback) => {
    user.deleteMany({}).exec((err, deletedData) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, deletedData);
      }
    });
  },
  deleteOneUser: (reqParam, callback) => {
    if (isEmpty(reqParam)) {
      callback("Please provide proper request data", null);
    } else {
      user.deleteOne({ userId: reqParam.userId }).exec((err, deletedData) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, deletedData);
        }
      });
    }
  },
  lookupApi: (reqParam, callback) => {
    if (isEmpty(reqParam)) {
      callback("Please provide proper request data", null);
    } else {
      user
        .aggregate([
          {
            $match: {
              userId: parseInt(reqParam.userId)
            }
          },
          {
            $lookup: {
              from: "addresses",
              localField: "address",
              foreignField: "_id",
              as: "address"
            }
          },
          {
            $unwind: "$address"
          }
        ])
        .exec((err, finalData) => {
          if (err) {
            callback(err, null);
          } else if (isEmpty(finalData)) {
            callback(null, "No data found");
          } else {
            callback(err, finalData);
          }
        });
    }
  }
};
