const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

const io = require("@pm2/io");

io.init({
  transactions: true, // will enable the transaction tracing
  http: true, // will enable metrics about the http server (optional)
});

dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api/user", require("./routes/userRoutes"));

//test API end point
app.get("/test", (req, res) => {
  res.send("This is a test API end point");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`User Service running on ports ${PORT}`);
  // simulate a ready application after 1 second
  setTimeout(function () {
    process.send("ready");
  }, 1000);
});
