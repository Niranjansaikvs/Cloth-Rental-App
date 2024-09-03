const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    productID: {
        type: mongoose.Types.ObjectId,
        require: true
    }
})

module.exports = mongoose.model("Booking",BookingSchema)