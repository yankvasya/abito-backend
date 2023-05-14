const mongoose = require("mongoose");
const { required } = require("../helpers/errors");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required,
    trim: true,
  },
  password: {
    type: String,
    required,
    trim: true,
  },
  firstName: {
    type: String,
    required,
    trim: true,
  },
  lastName: {
    type: String,
    required,
    trim: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  reviews: {
    type: Array,
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("User", userSchema);
