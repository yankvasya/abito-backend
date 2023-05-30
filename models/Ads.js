const mongoose = require("mongoose");
const { required } = require("../helpers/errors");

const adsSchema = new mongoose.Schema({
  title: {
    type: String,
    required,
  },
  image: {
    type: String,
    required,
  },
  link: {
    type: String,
    required,
  },
});

adsSchema.virtual("id").get(function () {
  return this._id ? this._id.toHexString() : null;
});

adsSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id; // удаляем _id
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Ads", adsSchema);
