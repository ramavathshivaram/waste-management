const Admin = require("../models/admin-model");
const Pickup = require("../models/pickup-model");
const IllegalDump = require("../models/illegal-dump-model");

const getAdminDashboard = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getpickups = async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      pickups,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAdminDashboard, getpickups };
