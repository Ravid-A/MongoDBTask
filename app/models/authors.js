const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const authorSchema = new Schema({
  name: String,
  country: String,
  createdAt: { type: Date, default: Date.now },
});

const Author = model("Author", authorSchema);

module.exports = Author;
