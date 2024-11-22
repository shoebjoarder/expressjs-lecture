const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
  address: {
    type: ObjectId,
    ref: "Address",
  },
});

module.exports = mongoose.model("User", userSchema);
