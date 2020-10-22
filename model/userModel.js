const user = require("../schema/user");
const waterfall = require("async/waterfall");

module.exports = {
  saveUser: (reqData, callback) => {
    waterfall(
      [
        function (callback) {
          user
            .findOne({}, {userId: 1})
            .sort({_id: -1})
            .exec((err, foundedData) => {
              if (err) {
                callback(err, null);
              } else if (!foundedData) {
                callback(null, {userId: 1});
              } else {
                callback(null, {userId: foundedData.userId + 1});
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
      } else if (foundedData.length == 0) {
        callback(null, "No data found");
      } else {
        callback(null, foundedData);
      }
    });
  },
  getOneUser: (reqData, callback) => {
    user.findOne({userId: reqData.userId}).exec((err, foundedData) => {
      if (err) {
        callback(err, null);
      } else if (!foundedData) {
        callback(null, "No data found");
      } else {
        callback(null, foundedData);
      }
    });
  },
  updateAllUser: (reqData, callback) => {
    user.updateMany({}, reqData).exec((err, updatedData) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, updatedData);
      }
    });
  },
  updateOneUser: (reqParam, reqData, callback) => {
    user
      .updateOne({userId: reqParam.userId}, reqData)
      .exec((err, updatedData) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, updatedData);
        }
      });
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
    user.deleteOne({userId: reqParam.userId}).exec((err, deletedData) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, deletedData);
      }
    });
  },
  lookupApi: (reqParam, callback) => {
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
        } else if (finalData.length == 0) {
          callback(null, "No data found");
        } else {
          callback(err, finalData);
        }
      });
  }
};
