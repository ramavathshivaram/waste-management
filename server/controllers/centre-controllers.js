const Centre = require("../models/centre-model");
const User = require("../models/user-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const registerCentre = async (req, res) => {
  try {
    const { name, address, phone, acceptedWasteTypes, operatingHours } =
      req.body;

    // ensure user exists
    const userId = req.user._id; // from protect middleware

    // Upload image if provided
    let image = {};
    if (req.file) {
      const upload = await cloudinary.uploader.upload(req.file.path, {
        folder: "centres",
      });

      image = {
        publicId: upload.public_id,
        url: upload.secure_url,
      };

      fs.unlinkSync(req.file.path);
    }

    // Create centre document
    const centre = await Centre.create({
      userId,
      name,
      address,
      phone,
      acceptedWasteTypes: JSON.parse(acceptedWasteTypes),
      operatingHours: operatingHours ? JSON.parse(operatingHours) : {},
      image,
      status: "inactive", // Admin must verify
      isAdminVerified: false,
    });

    // Update User role to centre
    await User.findByIdAndUpdate(userId, { role: "centre" });

    res.status(201).json({
      success: true,
      message: "Centre registered successfully. Pending admin approval.",
      data: centre,
    });
  } catch (err) {
    console.error("Centre registration error:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerCentre };
