const Collector = require("../models/collector-model");
const CollectorDailyStats = require("../models/collector-daily-stats-model");
const {
  update_collector_schema,
  create_collector_schema,
} = require("../lib/zod-schema");
const cloudinary = require("../configs/cloudinary");

const getCollector = async (req, res) => {
  try {
    const userId = req.user.id;

    const collector = await Collector.findOne({ userId })
      .populate("area.id")
      .lean();

    if (!collector) {
      return res.status(404).json({
        success: false,
        message: "Collector profile not found",
      });
    }

    // ✅ normalize date to start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = await CollectorDailyStats.findOne({
      collectorId: collector._id,
      date: today,
    }).lean();

    return res.status(200).json({
      success: true,
      data: {
        ...collector,
        stats: stats || null,
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
