const Centre = require("../models/centre-model");
const User = require("../models/user-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const getCentre = async (req, res) => {
  try {
    const userId = req.user._id;

    const centre = await Centre.findOne({ userId });

    if (!centre) {
      return res.status(404).json({
        success: false,
        message: "Centre profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: centre,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getCentre };
