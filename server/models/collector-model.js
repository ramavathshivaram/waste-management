const mongoose = require("mongoose");

const collectorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    licenseNumber: {
      type: String,
      trim: true,
      default: "",
    },

    isAdminVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
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

    vehicle: {
      number: {
        type: String,
        trim: true,
      },

      type: {
        type: String,
        enum: ["truck", "auto", "cycle-cart", "van", "bike"],
      },

      image: {
        publicId: { type: String },
        url: { type: String },
      },

      capacity: {
        current: {
          type: Number,
          default: 0,
        },
        max: {
          type: Number,
          default: 200,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Collector", collectorSchema);
