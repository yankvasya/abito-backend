const mongoose = require("mongoose");
const { required } = require("../helpers/errors");

const advertSchema = new mongoose.Schema({
  title: {
    type: String,
    required,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  photos: {
    type: [String],
    default: [],
  },
});

module.exports = mongoose.model("Advert", advertSchema);
