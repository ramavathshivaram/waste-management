const express = require("express");
const router = express.Router();
const { authorize } = require("../middlewares/auth-middleware");

const {
  createPickupRequest,
  getUserPickupRequests,
  updatePickupStatus,
} = require("../controllers/pickup-controller");
const upload = require("../middlewares/upload");

router.post("/create", upload.array("images", 5), createPickupRequest);

router.patch(
  "/status/:id",
  authorize("admin", "collector", "centre"),
  updatePickupStatus
);

router.get("/", getUserPickupRequests);

module.exports = router;
