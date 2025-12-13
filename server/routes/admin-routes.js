const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
  getpickups,
  getIllegalDumps,
  getAllCollectors,
  getAdminCollectorById,
  getAdminCentreById,
  getAllCentres,
} = require("../controllers/admin-controllers");

router.get("/dashboard", getAdminDashboard);

router.get("/pickups", getpickups);

router.get("/illegal-dumps", getIllegalDumps);

router.get("/collectors", getAllCollectors);

router.get("/centres", getAllCentres);

router.get("/collector/:id", getAdminCollectorById);

router.get("/centre/:id", getAdminCentreById);

// router.patch("/collector/:id", approveCollector);

module.exports = router;
