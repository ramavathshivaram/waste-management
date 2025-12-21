const express = require("express");
const router = express.Router();
const {
  getCentreDashboard,
  getCentreslocatons,
  createCentre,
} = require("../controllers/centre-controllers");
const {  authorize } = require("../middlewares/auth-middleware");
// const upload = require("../middlewares/upload");

router.get("/dashboard",authorize("centre"), getCentreDashboard);

router.get("/locations/:location", getCentreslocatons);

router.post("/",authorize("centre"), createCentre);

module.exports = router;
