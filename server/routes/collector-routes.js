const express = require("express");
const router = express.Router();

const {
  getCollector,
  updateCollector,
  createCollector,
  getCollectorMe,
  getAllPendingPickups,
} = require("../controllers/collector-controllers");

router.get("/", getCollector);

router.get("/me", getCollectorMe);

router.post("/", createCollector);

router.patch("/", updateCollector);

router.get("/pickups/pending", getAllPendingPickups);

module.exports = router;
