const IllegalDump = require("../models/illegal-dump-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const createIllegalDump = async (req, res) => {
  try {
    const { locationText, address, description } = req.body;

    const files = req.files || [];
    const images = [];


    // Upload each image to Cloudinary
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

    const report = await IllegalDump.create({
      citizenId: req.user._id,
      locationText,
      address,
      description,
      images,
    });


    console.log(report)
    res.status(201).json({
      success: true,
      data: report,
    });
  } catch (err) {
    console.error("Illegal dump error:", err);
    res.status(500).json({ message: err.message });
  }
};

const getUserDumps = async (req, res) => {
  try {
    const userId = req.user._id; // from protect middleware

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
