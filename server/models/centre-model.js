const mongoose = require("mongoose");

const centreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      trim: true,
      required: [true, "Please add centre name"],
    },

    address: {
      type: String,
    },

    phone: {
      type: String,
    },

    isAdminVerified: {
      type: Boolean,
      default: false,
    },

    isApproved: {
      type: Boolean,
      default: false,
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

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],   
      },
    },

    operatingHours: {
      open: { type: String },
      close: { type: String },
    },

    status: {
      type: String,
      enum: ["active", "inactive", "full"],
      default: "inactive",
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

centreSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Centre", centreSchema);
