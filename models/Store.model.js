const mongoose = require("mongoose");
const { link } = require("../routes");
const { Schema, model } = mongoose;

const storeSchema = new Schema({
  firstName: String,
  lastName: String,
  streetName: String,
  houseNumber: Number,
  postCode: Number,
  city: String,
  description: String,
  userAnswer: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Store", storeSchema);



