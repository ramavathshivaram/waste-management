const Area = require("../models/area-model");
const { isValidPolygon } = require("../lib/area-helper");

// Create a new area
const createArea = async (req, res) => {
  try {
    const { name, description, coordinates } = req.body;

    if (!name || !coordinates) {
      return res.status(400).json({
        status: false,
        message: "Name and coordinates are required",
      });
    }

    if (!isValidPolygon(coordinates)) {
      return res.status(400).json({
        status: false,
        message: "Invalid polygon coordinates",
      });
    }

    const area = await Area.create({
      name,
      description,
      area: {
        type: "Polygon",
        coordinates,
      },
    });

    return res.status(201).json({
      status: true,
      message: "Area created successfully",
      data: area,
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
    const areas = await Area.find(
      {},
      { name: 1, description: 1, area: 1 }
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
    const { name, description, coordinates } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (description) updateData.description = description;

    if (coordinates) {
      if (!isValidPolygon(coordinates)) {
        return res.status(400).json({
          status: false,
          message: "Invalid polygon coordinates",
        });
      }

      updateData.area = {
        type: "Polygon",
        coordinates,
      };
    }

    const area = await Area.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!area) {
      return res.status(404).json({
        status: false,
        message: "Area not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Area updated successfully",
      data: area,
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
