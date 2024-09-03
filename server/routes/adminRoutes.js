const express = require("express");
const router = express.Router();
const Admin = require("../db/adminSchema");
const Product = require("../db/productSchema");
const User = require("../db/userSchema");
const Booking = require("../db/bookingSchema");
const upload = require("../multer/multer_config");

router.post("/admin-register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      userName,
      email,
      password: hashedPassword,
    });
    res.json({
      msg: "admin Registered Succesfully",
      status: true,
    });
  } catch (error) {
    res.send({ msg: "Server error", status: false });
  }
});

// Route to handle file upload
router.post("/add-product", upload.single("image"), async (req, res) => {
  try {
    const { productName, price, color, category, size } = req.body;
    // Check if Multer processed the file
    if (!req.file) {
      return res
        .status(400)
        .send({ status: false, message: "Image upload failed" });
    }
    const image = req.file.path;
    await Product.create({
      productName,
      image,
      price,
      color,
      category,
      size,
    });
    res.send({ status: true, msg: "Product added sucessfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ status: false, message: "Internal Server Error" });
  }
});

router.get("/get-count", async (req, res) => {
  try {
    const users = await User.find();
    const products = await Product.find();
    const bookings = await Booking.find();
    res.send({ status: true, users, products, bookings});
  } catch (error) {
    res.send({ msg: "Server error", status: false });
  }
});

module.exports = router;
