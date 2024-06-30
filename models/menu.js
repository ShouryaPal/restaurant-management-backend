const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const menuItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["appetizers", "main courses", "desserts", "drinks"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const MenuItem = mongoose.model("menu", menuItemSchema);

module.exports = MenuItem;
