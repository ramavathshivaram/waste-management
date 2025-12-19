const Pickup = require("../models/pickup-model");
const IllegalDump = require("../models/illegal-dump-model");
const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");

const getAdminDashboard = async (req, res) => {
  try {
    const [totalCentres, totalCollectors, totalPickups, totalIllegalDumps] =
      await Promise.all([
        Centre.countDocuments(),
        Collector.countDocuments(),
        Pickup.countDocuments(),
        IllegalDump.countDocuments(),
      ]);

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

const getAdminRadar = async (req, res) => {
  try {
    const pickups = await Pickup.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: {
        pickups: {
          total: 120,
          pending: 34,
          completed: 86,
          delayed: 12,
        },
        centres: {
          total: 6,
          active: 5,
          inactive: 1,
          avgCapacityUsage: 72,
        },
        collectors: {
          total: 18,
          active: 14,
          inactive: 4,
          avgEfficiency: 80,
        },
        illegalDumps: {
          total: 22,
          high: 6,
          medium: 10,
          low: 6,
        },
      },
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

const getAllLocations = async (req, res) => {
  try {
    const centres = await Centre.find(
      { isApproved: true },
      { location: 1, _id: 1 }
    );

    const collector = await Collector.find(
      { isApproved: true },
      { location: 1, _id: 1 }
    );

    const pickups = await Pickup.find(
      {},
      { "location.coordinates": 1, _id: 1 }
    );

    res.status(200).json({
      success: true,
      data: {
        centres,
        collector,
        pickups,
      },
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
  getAllLocations,
};
