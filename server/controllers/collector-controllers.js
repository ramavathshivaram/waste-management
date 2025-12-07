const Collector = require("../models/collector-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

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

const updateCollector = async (req, res) => {
  try {
    const userId = req.user._id;

    let updateData = req.body;

    // Parse vehicle JSON
    if (updateData.vehicle) {
      updateData.vehicle = JSON.parse(updateData.vehicle);
    }

    // Flatten nested vehicle object into MongoDB update format
    if (updateData.vehicle) {
      updateData["vehicle.number"] = updateData.vehicle.number;
      updateData["vehicle.type"] = updateData.vehicle.type;
      updateData["vehicle.capacity.max"] = updateData.vehicle.capacity.max;

      delete updateData.vehicle;
    }

    // Handle image upload
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "waste-pickups",
      });

      // FIX: store image inside vehicle.image
      updateData["vehicle.image"] = {
        publicId: result.public_id,
        url: result.secure_url,
      };

      fs.unlinkSync(req.file.path);
    }

    // Update collector (dot-notation works perfectly)
    const updatedCollector = await Collector.findOneAndUpdate(
      { userId },
      updateData,
      { new: true }
    );

    if (!updatedCollector) {
      return res.status(404).json({
        success: false,
        message: "Collector profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedCollector,
    });
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
};
