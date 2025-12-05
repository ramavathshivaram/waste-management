const express = require("express");
const router = express.Router();

const { createPickupRequest } = require("../controllers/pickup-controller");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth-middleware");

router.post("/create", protect, upload.array("images", 5), createPickupRequest);

module.exports = router;
