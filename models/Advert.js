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

advertSchema.virtual("id").get(function () {
  return this._id ? this._id.toHexString() : null;
});

advertSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id; // удаляем _id
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Advert", advertSchema);
