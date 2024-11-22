const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: Number, required: true },
  },
});

module.exports = mongoose.model("User", userSchema);
