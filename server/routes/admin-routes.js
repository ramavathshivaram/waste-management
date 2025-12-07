const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
  getpickups,
} = require("../controllers/admin-controllers");

router.get("/", getAdminDashboard);

router.get('/pickups', getpickups);

module.exports = router;
