const express = require("express");
const router = express.Router();
const Staff = require("../models/staff");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hashSync(password, salt);
//     const newStaff = new Staff({ email, password: hashedPassword });
//     const savedStaff = await newStaff.save();
//     res.status(200).json(savedStaff);
//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: err.message });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const staffMember = await Staff.findOne({ email });

    if (!staffMember) {
      return res.status(404).json({ message: "User not found!" });
    }

    const match = await bcrypt.compare(password, staffMember.password);
    if (!match) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const token = jwt.sign(
      { _id: staffMember._id, email: staffMember.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );

    const { password: staffPassword, ...info } = staffMember._doc;
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true when in production
        sameSite: "none",
      })
      .status(200)
      .json(info);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
