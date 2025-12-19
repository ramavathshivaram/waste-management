const Area = require("../models/area-model");

// Create a new area

const createArea = async (req, res) => {
  try {
    const { name, description, coordinates } = req.body;

    const area = await Area.create({
      name,
      description,
      area: { type: "Polygon", coordinates },
    });

    res
      .status(201)
      .json({ message: "Area created successfully", status: true, data: area });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error", status: false });
  }
};

// Get all areas
const getAllAreas = async (req, res) => {
  try {
    const areas = await Area.find();
    res
      .status(200)
      .json({
        message: "Areas fetched successfully",
        status: true,
        data: areas,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error", status: false });
  }
};

// Get area by ID
const getAreaById = async (req, res) => {
  try {
    const { id } = req.params;
    const area = await Area.findById(id);

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
    const updatedData = req.body;

    const area = await Area.findByIdAndUpdate(id, updatedData, { new: true });

    res
      .status(200)
      .json({ message: "Area updated successfully", status: true, data: area });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error", status: false });
  }
};

// Delete area by ID
const deleteArea = async (req, res) => {
  try {
    const { id } = req.params;
    await Area.findByIdAndDelete(id);

    res
      .status(200)
      .json({ message: "Area deleted successfully", status: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error", status: false });
  }
};

module.exports = {
  createArea,
  getAllAreas,
  getAreaById,
  updateArea,
  deleteArea,
};
