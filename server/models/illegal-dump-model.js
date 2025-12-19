// models/illegal-dump-model.js
const mongoose = require("mongoose");

const illegalDumpSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    assignedCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collector",
      default: null,
      index: true,
    },

    address: {
      type: String,
    },

    description: {
      type: String,
      trim: true,
    },

    images: [
      {
        publicId: String, // for deleting from Cloudinary
        url: String, // secure_url to display
      },
    ],

    status: {
      type: String,
      enum: ["new", "in-review", "assigned", "resolved", "dismissed"],
      default: "new",
    },

    adminMessage: {
      type: String,
      default: "",
    },

    severity: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },

    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: { type: [Number], required: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("IllegalDump", illegalDumpSchema);
