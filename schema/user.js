const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String
  },
  userId: {
    type: Number,
    required: true,
    unique: true,
    immutable: true
  },
  age: {
    type: Number
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: "address"
  }
});
module.exports = mongoose.model("user", userSchema);
