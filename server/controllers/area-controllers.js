const Area = require("../models/area-model");
const { create_area_schema, update_area_schema } = require("../lib/zod-schema");

// Create a new area
const createArea = async (req, res) => {
  try {
    console.log(req.body);

    const parsed = create_area_schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        status: false,
        message: parsed.error.errors[0].message,
      });
    }

    const { name, description, area } = req.body;

    const newArea = await Area.create({
      name,
      description,
      area,
    });

    return res.status(201).json({
      status: true,
      message: "Area created successfully",
      data: newArea,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find({}).sort({ name: -1 });

    return res.status(200).json({
      status: true,
      message: "Areas fetched successfully",
      data: areas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getAllAreasUnassignedCollectors = async (req, res) => {
  try {
    const areas = await Area.find(
      { collectorId: { $exists: false } },
      { name: 1 }
    ).sort({ name: -1 });
    return res.status(200).json({
      status: true,
      message: "Areas fetched successfully",
      data: areas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const getAllAreasUnassignedCentres = async (req, res) => {
  try {
    const areas = await Area.find(
      { centreId: { $exists: false } },
      { name: 1 }
    ).sort({ name: 1 });
    return res.status(200).json({
      status: true,
      message: "Areas fetched successfully",
      data: areas,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

// Get area by ID
const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findById(id);

    if (!area) {
      return res.status(404).json({
        status: false,
        message: "Area not found",
      });
    }

    res
      .status(200)
      .json({ message: "Area fetched successfully", status: true, data: area });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error", status: false });
  }
};

// Update area by ID
const updateArea = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const parsed = update_area_schema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        status: false,
        message: parsed.error.errors[0].message,
      });
    }

    const { name, description, area } = parsed.data;

    const updateArea = await Area.findByIdAndUpdate(
      id,
      { name, description, area },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updateArea) {
      return res.status(404).json({
        status: false,
        message: "Area not found",
      });
    }

    console.log(updateArea);

    return res.status(200).json({
      status: true,
      message: "Area updated successfully",
      data: updateArea,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

const findAreaByPoint = async (req, res) => {
  const { lng, lat } = req.query;

  const area = await Area.findOne({
    area: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
      },
    },
  });

  res.json({ status: true, data: area });
};

// Delete area by ID
const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;

    const area = await Area.findByIdAndDelete(id);

    if (!area) {
      return res.status(404).json({
        status: false,
        message: "Area not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Area deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
  findAreaByPoint,
  getAllAreasUnassignedCollectors,
  getAllAreasUnassignedCentres,
};
