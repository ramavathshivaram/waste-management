const express = require("express");
const router = express.Router();

const {
  createIllegalDump,
  getUserDumps,
} = require("../controllers/illegal-dump-controller");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth-middleware");

router.post("/create", protect, upload.array("images", 5), createIllegalDump);

router.get("/", protect, getUserDumps);

module.exports = router;
