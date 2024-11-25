const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const UserSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
