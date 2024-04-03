const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  exp: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
