const express = require("express");
const router = express.Router();
const { getCentre } = require("../controllers/centre-controllers");
const upload = require("../middlewares/upload");

router.get("/", upload.single("image"), getCentre);

module.exports = router;
