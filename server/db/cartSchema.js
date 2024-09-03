const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    require: true,
  },
  productID: {
    type: Array,
    require: true
  },
});

module.exports = mongoose.model("Cart",CartSchema)