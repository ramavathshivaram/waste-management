const mongoose = require("mongoose");

const collectorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    assignedArea: {
      type: String,
      required: true,
    },

    // Collector online/offline status
    status: {
      type: String,
      enum: ["active", "inactive", "busy"],
      default: "active",
    },

    completedPickups: {
      type: Number,
      default: 0,
    },

    vehicleNumber: {
      type: String,
      default: null,
    },

    currentCapacityPercent: {
      type: Number,
      default: 0,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Collector", collectorSchema);
