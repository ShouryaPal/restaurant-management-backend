const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  items: [
    {
      _id: String,
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
