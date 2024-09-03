const mongoose = require("mongoose");

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.Mongo_URI);
      console.log("connected to DB");
    } catch (error) {
      console.log(error);
    }
  };

  module.exports = connectDB