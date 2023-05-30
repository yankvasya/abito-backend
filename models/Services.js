const mongoose = require("mongoose");
const { required } = require("../helpers/errors");

const servicesSchema = new mongoose.Schema({
  title: {
    type: String,
    required,
  },
  description: {
    type: String,
    required,
  },
  icon: {
    type: String,
    required,
  },
});

servicesSchema.virtual("id").get(function () {
  return this._id ? this._id.toHexString() : null;
});

servicesSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret._id; // удаляем _id
    delete ret.__v;
    return ret;
  },
});

module.exports = mongoose.model("Services", servicesSchema);
