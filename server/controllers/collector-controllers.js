const Collertor = require("../models/collector-model");

const createCollector = async (req, res) => {
  try {
    const userId = req.user._id;
    const { vehicleNumber, } = req.body;
    const collector = await Collertor.create({ userId, vehicleNumber });
    res.status(201).json({
      success: true,
      data: collector,
    });
  } catch (error) {
    throw new Error("Error creating collector");
  }
};

const getCollector = async () => {
  try {
    const userId = req.user._id;
    const collector = await Collertor.create({ userId });
    res.status(201).json({
      success: true,
      data: collector,
    });
  } catch (error) {
    throw new Error("Error creating collector");
  }
};

module.exports = {
  createCollector,
  getCollector,
};
