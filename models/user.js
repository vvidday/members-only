const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  is_member: { type: Boolean, required: true },
  is_admin: { type: Boolean, requireed: true },
});

module.exports = mongoose.model("User", UserSchema);
