const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dependencySchema = new Schema({
  name: String,
  description: String,
  store: { type: Schema.Types.ObjectId, ref: "store" },
});

module.exports = model("Dependency", dependencySchema);
