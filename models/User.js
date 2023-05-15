const mongoose = require("mongoose");
const validator = require("validator");
const { required } = require("../helpers/errors");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required,
    trim: true,
  },
  email: {
    type: String,
    required,
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Введен некороректный email",
      isAsync: false,
    },
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
