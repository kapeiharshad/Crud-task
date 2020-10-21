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
  email: {
    type: String,
    unique: true
  }
});
module.exports = mongoose.model("user", userSchema);
