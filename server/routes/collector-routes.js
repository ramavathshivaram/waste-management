const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/upload");

const {
  getCollector,
  updateCollector,
  createCollector,
  getCollectorMe,
} = require("../controllers/collector-controllers");

router.get("/", getCollector);

router.get("/me", getCollectorMe);

router.post("/", createCollector);

router.patch("/", updateCollector);

module.exports = router;
