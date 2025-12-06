const express = require("express");
const router = express.Router();

const {
  createCollector,
  getCollector,
} = require("../controllers/collector-controllers");

router.post("/create", createCollector);
router.get("/", getCollector);

module.exports = router;
