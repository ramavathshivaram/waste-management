const PickupRequest = require("../models/pickup-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const createPickupRequest = async (req, res) => {
  try {
    const { wasteType, quantity, address, scheduledDateTime } = req.body;
    const images = [];

    // Upload each image to Cloudinary
    for (const file of req.files) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "waste-pickups",
      });

      images.push({
        publicId: result.public_id,
        url: result.secure_url,
      });

      fs.unlinkSync(file.path); // delete temp file
    }

    const newRequest = await PickupRequest.create({
      citizenId: req.user._id,
      wasteType: wasteType,
      quantity: quantity,
      address: address,
      scheduledDateTime: scheduledDateTime,
      images,
    });

    console.log(newRequest);

    res.status(201).json({
      success: true,
      data: newRequest,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const getUserPickupRequests = async (req, res) => {
  try {
    const requests = await PickupRequest.find({ citizenId: req.user._id }).sort(
      {
        createdAt: -1,
      }
    );

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
