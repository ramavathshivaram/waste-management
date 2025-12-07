const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  getCollector,
  updateCollector,
} = require("../controllers/collector-controllers");

router.get("/", getCollector);

router.patch("/", upload.single("image"), updateCollector);

module.exports = router;
