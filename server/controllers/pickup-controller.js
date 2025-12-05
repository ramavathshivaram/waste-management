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

module.exports = {
  createPickupRequest,
};
