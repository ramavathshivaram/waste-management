const express = require("express");
const router = express.Router();

const { registerCentre } = require("../controllers/centre-controllers");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth-middleware");

router.post("/register", protect, upload.single("image"), registerCentre);

module.exports = router;
