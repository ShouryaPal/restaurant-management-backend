const express = require("express");
const router = express.Router();
const Order = require("../models/order");

//Ordered by customer
router.post("/api/orders", async (req, res) => {
  try {
    const { tableNumber, items, totalAmount, email } = req.body;

    const newOrder = new Order({
      tableNumber,
      items,
      totalAmount,
      email,
      status: "pending",
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Error creating order" });
  }
});

//Orders for specific email that are pending
router.get("/pending/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const pendingOrders = await Order.find({ email, status: "pending" })
      .sort({ createdAt: -1 }) // Sort by newest first
      .select("tableNumber items totalAmount createdAt status");

    res.json(pendingOrders);
  } catch (error) {
    console.error("Error fetching pending orders:", error);
    res.status(500).json({ message: "Error fetching pending orders" });
  }
});

//All orders
router.get("/api/allorders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
});

//For changing status of order
router.put("/api/orders/:orderId/status", async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Error updating order status" });
  }
});

module.exports = router;
