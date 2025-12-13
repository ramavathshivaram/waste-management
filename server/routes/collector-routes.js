const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/upload");

const {
  getCollector,
  updateCollector,
  createCollector,
} = require("../controllers/collector-controllers");

router.get("/", getCollector);

router.post("/", createCollector);

router.patch("/", updateCollector);

module.exports = router;
