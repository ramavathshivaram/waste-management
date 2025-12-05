const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./configs/db");
const handleErros = require("./middlewares/handleErrors");
const cookieParser = require("cookie-parser");

//! OPTIIONS
const options = {
  origin: process.env.ORIGIN || "http://localhost:5173",
  credentials: true,
};

//! Load env vars
dotenv.config();

const app = express();

//! Middleware
app.use(express.json());
app.use(cors(options));
app.use(morgan("dev"));
app.use(cookieParser());

//! Basic route
app.get("/", (req, res) => {
  res.send("EcoTrack API is running");
});

//! AUTH ROUTES
app.use("/api/auth", require("./routes/auth-routes"));

app.use("/api/pickup", require("./routes/pickup-routes"));

//! Error handling middleware
app.use(handleErros);

const PORT = process.env.PORT || 5000;

//! Connect to database
connectDB().then(() => {
  //! Start server
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});
