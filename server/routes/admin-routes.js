const express = require("express");
const router = express.Router();

const {
  getAdmin,
  getpickups,
  getAdminApprovals,
  getAdminCollectorById,
  getAdminCentreById,
  approveCollector,
} = require("../controllers/admin-controllers");

router.get("/", getAdmin);

router.get("/pickups", getpickups);

router.get("/approvals", getAdminApprovals);

router.get("/collector/:id", getAdminCollectorById);

router.get("/centre/:id", getAdminCentreById);

router.patch("/collector/:id", approveCollector);

module.exports = router;
