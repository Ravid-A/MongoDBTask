const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderItemSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book" },
  amount: Number,
});

const orderSchema = new Schema({
  items: [orderItemSchema],
  totalPrice: Number,
  date: { type: Date, default: Date.now },
});

const Order = model("Order", orderSchema);

module.exports = Order;
