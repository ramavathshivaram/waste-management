const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./configs/db");
const handleErrors = require("./middlewares/handleErrors");
const cookieParser = require("cookie-parser");
const { protect, authorize } = require("./middlewares/auth-middleware");

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
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));
app.use(morgan("dev"));
app.use(cookieParser());

//! Basic route
app.get("/", (req, res) => {
  res.send("EcoTrack API is running");
});

//! AUTH ROUTES
app.use("/api/auth", require("./routes/auth-routes"));

//! CITIZEN ROUTES
app.use(
  "/api/pickup",
  protect,
  authorize("citizen"),
  require("./routes/pickup-routes")
);

app.use(
  "/api/illegal-dump",
  protect,
  authorize("citizen"),
  require("./routes/illegal-dump-routes")
);

//! COLLECTOR ROUTES
app.use(
  "/api/collector",
  protect,
  authorize("collector"),
  require("./routes/collector-routes")
);

//! CENTRE ROUTES
app.use(
  "/api/centre",
  protect,
  authorize("centre"),
  require("./routes/centre-routes")
);

//! ADMIN ROUTES
app.use(
  "/api/admin",
  protect,
  authorize("admin"),
  require("./routes/admin-routes")
);

//! 404 HANDLER
app.use((req, res) => {
  return res
    .status(404)
    .json({ success: false, message: "API route not found" });
});

//! Error handling middleware
app.use(handleErrors);

const PORT = process.env.PORT || 5000;

//! Connect DB then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    );
  });
});
