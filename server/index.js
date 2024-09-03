const express = require("express");
const cors = require("cors");
require("dotenv").config();
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./db/db_config");

const app = express();
const port = 8001;

app.use(
  cors({
    // origin:'https://wash-wave.vercel.app'
    origin: " http://localhost:5173",
  })
);
app.use(express.json());
app.use('/uploads', express.static('uploads'));

connectDB();

app.get("/", async (req, res) => {
  res.send("HELLO WORLD");
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
