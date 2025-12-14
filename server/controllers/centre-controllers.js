const Centre = require("../models/centre-model");
const { create_centre_schema } = require("../lib/zod-schema");
const User = require("../models/user-model");
const cloudinary = require("../configs/cloudinary");
const fs = require("fs");

const getCentreDashboard = async (req, res) => {
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

const getCentreslocatons = async (req, res) => {
  try {
    const [lng, lat] = req.params.location.split(",").map(Number);

    const centres = await Centre.find(
      {
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [lng, lat],
            },
            $maxDistance: 10000, // 10km
          },
        },
      },
      {
        name: 1,
        location: 1,
      }
    );

    res.status(200).json({
      success: true,
      data: centres,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const createCentre = async (req, res) => {
  try {
    const parsed = create_centre_schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: parsed.error.errors[0].message,
      });
    }

    const userId = req.user._id;

    const { name, desc, coordinates, operatingHours } = parsed.data;

    const centre = await Centre.create({
      userId,
      name,
      desc,
      location: {
        type: "Point",
        coordinates,
      },
      operatingHours,
    });

    return res.status(200).json({
      success: true,
      data: centre,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getCentreDashboard, getCentreslocatons, createCentre };
