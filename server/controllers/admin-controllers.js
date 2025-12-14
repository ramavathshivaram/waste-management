const Admin = require("../models/admin-model");
const Pickup = require("../models/pickup-model");
const IllegalDump = require("../models/illegal-dump-model");
const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");

const getAdminDashboard = async (req, res) => {
  try {
    /* ---------------- COUNTS ---------------- */
    const [totalCentres, totalCollectors, totalPickups, totalIllegalDumps] =
      await Promise.all([
        Centre.countDocuments(),
        Collector.countDocuments(),
        Pickup.countDocuments(),
        IllegalDump.countDocuments(),
      ]);

    /* ---------------- PICKUPS BY STATUS ---------------- */
    const pickupsByStatus = await Pickup.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    /* ---------------- ILLEGAL DUMPS BY SEVERITY ---------------- */
    const dumpsBySeverity = await IllegalDump.aggregate([
      {
        $group: {
          _id: "$severity",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          severity: "$_id",
          count: 1,
        },
      },
    ]);

    /* ---------------- COLLECTORS BY STATUS ---------------- */
    const collectorsByStatus = await Collector.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          status: "$_id",
          count: 1,
        },
      },
    ]);

    /* ---------------- RESPONSE ---------------- */
    res.status(200).json({
      success: true,
      data: {
        totals: {
          centres: totalCentres,
          collectors: totalCollectors,
          pickups: totalPickups,
          illegalDumps: totalIllegalDumps,
        },
        pickupsByStatus,
        dumpsBySeverity,
        collectorsByStatus,
      },
    });
  } catch (err) {
    console.error("Admin Dashboard Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
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
const getIllegalDumps = async (req, res) => {
  try {
    const illegalDumps = await IllegalDump.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: illegalDumps,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getAllCollectors = async (req, res) => {
  try {
    const collectors = await Collector.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: collectors,
    });
  } catch (error) {
    throw new Error("Error fetching admin approvals");
  }
};

const getAllCentres = async (req, res) => {
  try {
    const centre = await Centre.find().sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: centre,
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
  getAdminDashboard,
  getpickups,
  getIllegalDumps,
  getAllCollectors,
  getAllCentres,
  getAdminCollectorById,
  getAdminCentreById,
  approveCollector,
};
