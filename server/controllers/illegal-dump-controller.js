const IllegalDump = require("../models/illegal-dump-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const createIllegalDump = async (req, res) => {
  try {
    console.log(req.body);

    let { priority, coordinates, address, description } = req.body;

    // ✅ Safe parsing
    if (typeof coordinates === "string") {
      coordinates = JSON.parse(coordinates);
    }

    if (
      !coordinates ||
      typeof coordinates.latitude !== "number" ||
      typeof coordinates.longitude !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid coordinates format",
      });
    }

    const { latitude, longitude } = coordinates;

    const files = req.files || [];
    const images = [];

    // ✅ Upload images
    for (const file of files) {
      const upload = await cloudinary.uploader.upload(file.path, {
        folder: "illegal-dumps",
      });

      images.push({
        publicId: upload.public_id,
        url: upload.secure_url,
      });

      fs.unlinkSync(file.path);
    }

    // ✅ Create report
    const report = await IllegalDump.create({
      citizenId: req.user.id,
      priority,
      address,
      description,
      images,
      location: {
        type: "Point",
        coordinates: [longitude, latitude], // [lng, lat]
      },
    });

    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (err) {
    console.error("Illegal dump error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


const getUserDumps = async (req, res) => {
  try {
    const userId = req.user.id; // from protect middleware

    const dumps = await IllegalDump.find({ citizenId: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: dumps.length,
      data: dumps,
    });
  } catch (err) {
    console.error("Error fetching user dumps:", err);
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createIllegalDump,
  getUserDumps,
};
