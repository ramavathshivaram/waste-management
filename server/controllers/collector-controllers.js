const Collector = require("../models/collector-model");
const CollectorDailyStats = require("../models/collector-daily-stats-model");
const {
  update_collector_schema,
  create_collector_schema,
} = require("../lib/zod-schema");
const buildOptimalRoute = require("../lib/get-optimal-route");

const getCollector = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1️⃣ Get collector + centre
    const collector = await Collector.findOne({ userId })
      .populate({
        path: "area.id",
        select: "centreId",
        populate: {
          path: "centreId",
          select: "location name",
        },
      })
      .lean();

    if (!collector) {
      return res.status(404).json({
        success: false,
        message: "Collector profile not found",
      });
    }

    // 2️⃣ Normalize today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 3️⃣ Get today stats
    const stats = await CollectorDailyStats.findOne({
      collectorId: collector._id,
      date: today,
    })
      .populate({
        path: "pickups.pending",
        select: "location",
      })
      .select("pickups.pending")
      .lean();

    const coordinates =
      stats?.pickups?.pending.map((p) => p.location.coordinates) || [];

    const collectorLocation = collector.location.coordinates; // [lng, lat]

    const centreLocation = collector.area.id.centreId.location.coordinates;

    console.log(collectorLocation, centreLocation, coordinates);

    // 6️⃣ Build optimal route
    const route = buildOptimalRoute(
      collectorLocation,
      coordinates,
      centreLocation
    );

    console.log(route);

    return res.status(200).json({
      success: true,
      data: {
        collector,
        pickups: coordinates.length,
        route,
      },
    });
  } catch (error) {
    console.error("Error fetching collector:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching collector",
    });
  }
};

const createCollector = async (req, res) => {
  try {
    const userId = req.user.id;

    const parsed = create_collector_schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const { licenseNumber, vehicleNumber, description, area } = parsed.data;

    const collector = await Collector.findOneAndUpdate(
      { userId },
      {
        $set: {
          userId,
          licenseNumber,
          description,
          vehicle: { number: vehicleNumber },
          area,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(collector.wasNew ? 201 : 200).json({
      success: true,
      data: collector,
    });
  } catch (error) {
    console.error("COLLECTOR ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create or update collector",
    });
  }
};

const updateCollector = async (req, res) => {
  try {
    const userId = req.user.id;

    const parsed = update_collector_schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating collector" });
  }
};

const getCollectorMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const collector = await Collector.findOne({ userId });
    if (!collector) {
      return res.status(404).json({
        success: false,
        message: "Collector profile not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: collector,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error fetching collector",
    });
  }
};

module.exports = {
  getCollector,
  updateCollector,
  createCollector,
  getCollectorMe,
};
