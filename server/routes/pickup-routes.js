const express = require("express");
const router = express.Router();
const { authorize } = require("../middlewares/auth-middleware");

const {
  createPickupRequest,
  getUserPickupRequests,
  updatePickupStatus,
} = require("../controllers/pickup-controller");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth-middleware");

router.post("/create", protect, upload.array("images", 5), createPickupRequest);

router.patch(
  "/status/:id",
  protect,
  authorize("admin", "collector", "centre"),
  updatePickupStatus
);

router.get("/", protect, getUserPickupRequests);

module.exports = router;
