const mongoose = require("mongoose");

const collectorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    isAdminVerifyed: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "busy"],
      default: "inactive",
    },

    completedPickups: {
      type: Number,
      default: 0,
    },

    vehicleNumber: {
      type: String,
      required: true,
    },
    licenceNumber: {
      type: String,
      required: true,
    },

    currentCapacityPercent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collector", collectorSchema);
