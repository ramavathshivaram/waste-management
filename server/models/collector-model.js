const mongoose = require("mongoose");

const collectorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    // Driving license
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Admin approves collector
    isAdminVerified: {
      type: Boolean,
      default: false,
    },

    // Collector online/offline/busy
    status: {
      type: String,
      enum: ["active", "inactive", "busy"],
      default: "inactive",
    },

    // Total pickups completed
    completedPickups: {
      type: Number,
      default: 0,
    },

    // Vehicle details
    vehicle: {
      Number: {
        type: String,
        required: true,
        trim: true,
      },

      Type: {
        type: String,
        enum: ["truck", "auto", "cycle-cart", "van", "bike"],
        required: true,
      },

      Image: {
        publicId: { type: String },
        url: { type: String },
      },

      currentCapacity: {
        type: Number,
        default: 0, //// in kgs
      },

      maxCapacity: {
        type: Number,
        default: 0, //// in kgs
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collector", collectorSchema);
