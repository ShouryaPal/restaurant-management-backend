const express = require("express");
const router = express.Router();
const MenuItem = require("../models/menu");

// All menu items
router.get("/", async (req, res) => {
  try {
    console.log("Fetching menu items...");
    const menuItems = await MenuItem.find({});
    res.json(menuItems);
  } catch (err) {
    console.error("Error fetching menu items:", err);
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

module.exports = router;
