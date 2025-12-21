const PickupRequest = require("../models/pickup-model");
const { create_pickup_schema } = require("../lib/zod-schema");
const Area = require("../models/area-model");

const createPickupRequest = async (req, res) => {
  try {
    const { address, mode, coordinates } = req.body;

    const [longitude, latitude] = coordinates;

    const area = await Area.findOne({
      area: {
        $geoIntersects: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
        },
      },
    });

    if (!area) {
      return res.status(400).json({
        success: false,
        message: "Area not found for this location",
      });
    }
    if (!area.collectorId) {
      return res.status(400).json({
        success: false,
        message: "Collector not found for this location",
      });
    }

    const newRequest = await PickupRequest.create({
      citizenId: req.user.id,
      address,
      mode,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      area: {
        id: area._id,
        name: area.name,
      },
    });

    return res.status(201).json({
      success: true,
      data: newRequest,
    });
  } catch (err) {
    console.error("Create Pickup Error:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getUserPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({ citizenId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: requests,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Update pickup request status
const updatePickupStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Optional: Define allowed statuses
    const allowedStatuses = [
      "pending",
      "accepted",
      "assigned",
      "in-progress",
      "completed",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRequest = await PickupRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Pickup request not found" });
    }

    res.status(200).json({
      success: true,
      data: updatedRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createPickupRequest,
  getUserPickupRequests,
  updatePickupStatus,
};
