// models/Place.js
const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true }
});

module.exports = mongoose.model("Place", placeSchema);
