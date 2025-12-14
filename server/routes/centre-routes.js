const express = require("express");
const router = express.Router();
const {
  getCentreDashboard,
  getCentreslocatons,
  createCentre,
} = require("../controllers/centre-controllers");
// const upload = require("../middlewares/upload");

router.get("/dashboard", getCentreDashboard);

router.get("/locations/:location", getCentreslocatons);

router.post("/", createCentre);

module.exports = router;
