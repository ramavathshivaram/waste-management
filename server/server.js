const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const connectDB = require("./configs/db");
const handleErrors = require("./middlewares/handleErrors");
const { protect, authorize } = require("./middlewares/auth-middleware");

const agenda = require("./configs/agenda");

require("./routes/agenda-jobs");

const initSeed = require("./seed");
// initSeed();

//! Load env vars
dotenv.config();

//! OPTIIONS
const options = {
  origin: process.env.ORIGIN || "http://localhost:5173",
  credentials: true,
};

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, //// 15 minutes
  max: 100, //// limit each IP to 100 req per windowMs
});

const compress = compression({
  threshold: 1024, //// compress larger than 1KB,
});

const app = express();

//! Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(options));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(rateLimiter);
app.use(compress);

//! Basic route
app.get("/", (req, res) => {
  res.send("waste management API is running");
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

//! ILLEGAL DUMP ROUTES
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
app.use("/api/centre", protect, require("./routes/centre-routes"));

//! ADMIN ROUTES
app.use(
  "/api/admin",
  protect,
  authorize("admin"),
  require("./routes/admin-routes")
);

//! AREA ROUTES
app.use("/api/area", protect, require("./routes/area-routes"));

//! 404 API NOT FOUND HANDLER
app.use((req, res) => {
  return res
    .status(404)
    .json({ success: false, message: "API route not found" });
});

//! Error handling middleware
app.use(handleErrors);

const PORT = process.env.PORT || 5000;

//! Connect DB then start server
connectDB().then(async () => {
  await agenda.start();
  console.log("Agenda started");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  await agenda.schedule("in 1 seconds", "assign-areas-to-nearby-centres");
});
