const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const customerAuthRoute = require("./routes/customerAuth");
const staffAuthRoute = require("./routes/staffAuth");
const menu = require("./routes/menuItem");
const order = require('./routes/order')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected successfully!");
  } catch (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};

//middlewares
dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/customer/auth", customerAuthRoute);
app.use("/api/staff/auth/",staffAuthRoute)
app.use("/menu/",menu)
app.use("/order/",order)

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("app is running on port " + process.env.PORT);
});
