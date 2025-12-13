const express = require("express");
const router = express.Router();
const {
  getCentre,
  getCentreslocatons,
} = require("../controllers/centre-controllers");
const upload = require("../middlewares/upload");

router.get("/", upload.single("image"), getCentre);

router.get("/locations/:location", getCentreslocatons);

module.exports = router;
