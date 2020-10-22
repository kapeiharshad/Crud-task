const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const addressSchema = new Schema({
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  }
});
module.exports = mongoose.model("address", addressSchema);
