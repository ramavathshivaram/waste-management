const express = require("express");
const router = express.Router();

const {
  createIllegalDump,
  getUserDumps,
} = require("../controllers/illegal-dump-controller");
const upload = require("../middlewares/upload");

router.post("/create", upload.array("images", 5), createIllegalDump);

router.get("/", getUserDumps);

module.exports = router;
