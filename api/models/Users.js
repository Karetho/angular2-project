const mongoose = require("mongoose");

const Users = mongoose.Schema({
  firstName: { type: String, trim: true, default: "" },
  lastName: { type: String, trim: true, default: "" },
  email: { type: String, trim: true, default: "" }
});

module.exports = mongoose.model("Users", Users);
