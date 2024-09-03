const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../db/userSchema");
const Product = require("../db/productSchema");
const Cart = require("../db/cartSchema");

router.post("/auth", async (req, res) => {
  try {
    const { token, email } = req.body;

    const isValid = jwt.verify(token, process.env.Jwt_Secret, email);

    if (!isValid) {
      return res.json({ msg: "jwt expired", status: false });
    }
    res.json({ msg: "jwt verified", status: true });
  } catch (error) {
    res.json({ msg: "auth failed", status: false });
  }
});

router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "User already exists", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    const payload = newUser.email;
    const token = await jwt.sign({ payload }, process.env.Jwt_Secret, {
      expiresIn: "1d",
    });

    res.json({
      token,
      msg: "User Registered Succesfully",
      status: true,
      newUser,
    });
  } catch (err) {
    res.send({ msg: "Server error", status: false });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailCheck = await User.findOne({ email });
    if (!emailCheck) {
      return res.json({ msg: "Email not registered", status: false });
    }

    const isPasswordValid = await bcrypt.compare(password, emailCheck.password);

    if (!isPasswordValid) {
      return res.json({ msg: "Invalid password", status: false });
    }
    const payload = emailCheck.email;
    const token = jwt.sign({ payload }, process.env.Jwt_Secret, {
      expiresIn: "1d",
    });
    res.send({
      msg: "User login Sucessfully",
      status: true,
      token,
      emailCheck,
    });
  } catch (err) {
    res.send({ msg: "Server error", status: false });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send({ products });
  } catch (error) {
    res.send({ msg: "Server error", status: false });
  }
});
router.post("/add-cart", async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const cartExists = await Cart.findOne({ userID: userID });
    if (cartExists) {
      const addToCart = await Cart.findOneAndUpdate(
        { userID: userID },
        { $push: { productID: productID } }
      );
      if (addToCart) {
        return res.send({ msg: "Item added to Cart", status: true });
      }
      res.send({ msg: "Somthing went Wrong", status: false });
    }
    const addToCart = await Cart.create({ userID, productID });
    if (addToCart) {
      return res.send({ msg: "Item added to Cart", status: true });
    }
    res.send({ msg: "Somthing went Wrong", status: false });
  } catch (error) {
    res.send({ msg: "Server error", status: false });
  }
});
router.get("/get-cart/:id", async (req, res) => {
  try {
    let cartTotal = 0
    const userID = req.params.id;
    const userCart = await Cart.findOne({ userID: userID });
    if (!userCart) {
      return res.send({ msg: "No Items In Cart",cartTotal, status: false });
    } else if (userCart.productID.length <= 0) {
      return res.send({ msg: "No Items In Cart",cartTotal, status: false });
    }
    const cartProducts = []
    
    for(let i=0 ; i <= userCart.productID.length-1 ; i++){
      const products = await Product.findById(userCart.productID[i])
      cartProducts.push(products)
      cartTotal=cartTotal+products.price
    }
    res.send({cartProducts,cartTotal,status:true});
  } catch (error) {
    res.send({ msg: "Server error", status: false });
  }
});
router.post("/delete-cart", async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const deleteCart = await Cart.findOneAndUpdate(
      { userID: userID },
      { $pull: { productID: productID } }
    );
    if (deleteCart) {
      return res.send({ msg: "Item deleted successfully", status: true });
    }
    res.send({ msg: "somthing went wrong", status: false });
  } catch (error) {
    res.send({ msg: "Server error", status: false });
  }
});

module.exports = router;
