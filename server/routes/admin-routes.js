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
  getAllLocations,
  approve,
  getCollectorStatsByDate,
} = require("../controllers/admin-controllers");

router.get("/dashboard", getAdminDashboard);

router.get("/pickups", getpickups);

router.get("/illegal-dumps", getIllegalDumps);

router.get("/collectors", getAllCollectors);

router.get("/centres", getAllCentres);

router.get("/collector/:id", getAdminCollectorById);

router.get("/centre/:id", getAdminCentreById);

router.get("/locations", getAllLocations);

router.patch("/approve/:id", approve);

router.get("/collector/stats/:date/:collectorId", getCollectorStatsByDate);

module.exports = router;
