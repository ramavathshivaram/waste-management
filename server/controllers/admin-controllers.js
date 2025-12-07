const Admin = require("../models/admin-model");
const Pickup = require("../models/pickup-model");
const IllegalDump = require("../models/illegal-dump-model");
const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");

const getAdmin = async (req, res) => {
  try {
    //todo get admin
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

const getAdminApprovals = async (req, res) => {
  try {
    const collectors = await Collector.find({ isAdminVerified: false }).sort({
      createdAt: -1,
    });

    const centres = await Centre.find({ isAdminVerified: false }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: {
        collectors,
        centres,
      },
    });
  } catch (error) {
    throw new Error("Error fetching admin approvals");
  }
};

const getAdminCollectorById = async (req, res) => {
  try {
    const id = req.params.id;
    const collector = await Collector.findById(id).populate("userId");
    res.status(200).json({
      success: true,
      data: collector,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
const getAdminCentreById = async (req, res) => {
  try {
    const id = req.params.id;
    const centre = await Centre.findById(id).populate("userId");
    res.status(200).json({
      success: true,
      data: centre,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const approveCollector = async (req, res) => {
  try {
    const id = req.params.id;
    const isApproved = req.body.isApproved;
    const collector = await Collector.findByIdAndUpdate(
      id,
      {
        isAdminVerified: true,
        isApproved,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: collector,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAdmin,
  getpickups,
  getAdminApprovals,
  getAdminCollectorById,
  getAdminCentreById,
  approveCollector,
};
