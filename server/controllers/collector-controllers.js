const Collector = require("../models/collector-model");
const {
  update_collector_schema,
  create_collector_schema,
} = require("../lib/zod-schema");
const cloudinary = require("../configs/cloudinary");

const getCollector = async (req, res) => {
  try {
    const userId = req.user._id;

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
    throw new Error("Error fetching collector");
  }
};

const createCollector = async (req, res) => {
  try {
    const userId = req.user._id;
    const parsed = create_collector_schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const { licenseNumber, vehicleNumber, description, coordinates } =
      parsed.data;

    const collector = await Collector.create({
      userId,
      licenseNumber,
      description,
      vehicle: { number: vehicleNumber },
      location: {
        type: "Point",
        coordinates, //// [longitude, latitude]
      },
    });

    return res.status(200).json({
      success: true,
      data: collector,
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error updating collector" });
  }
};

const updateCollector = async (req, res) => {
  try {
    const userId = req.user._id;

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

module.exports = {
  getCollector,
  updateCollector,
  createCollector,
};
