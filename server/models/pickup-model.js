const mongoose = require("mongoose");

const pickupRequestSchema = new mongoose.Schema(
  {
    citizenId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    wasteType: {
      type: String,
      enum: ["plastic", "organic", "e-waste", "metal", "paper", "mixed"],
      default: null,
    },

    quantity: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    scheduledDateTime: {
      type: Date,
      default: null,
    },

    mode: {
      type: String,
      enum: ["once", "daily"],
      default: "once",
    },

    images: [
      {
        publicId: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],

    // ⭐ GeoJSON location
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
        validate: {
          validator: function (value) {
            return value.length === 2;
          },
          message: "Coordinates must be [longitude, latitude]",
        },
      },
    },

    status: {
      type: String,
      enum: [
        "pending",
        "assigned",
        "in-progress",
        "picked",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    otp: {
      type: Number,
      default: null,
    },

    assignedCollectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collector",
      default: null,
    },

    desc: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// ⭐ Required for geospatial queries like $near
pickupRequestSchema.index({ location: "2dsphere" });
pickupRequestSchema.index({ assignedCollectorId: 1 });
pickupRequestSchema.index({ citizenId: 1 });

module.exports = mongoose.model("PickupRequest", pickupRequestSchema);
