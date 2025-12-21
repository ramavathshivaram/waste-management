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
      required: [true, "Please add a license number"],
      unique: true,
    },

    area: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Area",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },

    status: {
      type: String,
      enum: ["active", "rejected", "inactive", "busy"],
      default: "inactive",
    },

    vehicle: {
      number: {
        type: String,
        trim: true,
        required: [true, "Please add vehicle number"],
        unique: true,
      },

      capacity: {
        current: {
          type: Number,
          default: 0,
        },
        max: {
          type: Number,
          default: 500,
        },
      },
    },

    desc: {
      type: String,
      default: "",
      select: false,
    },

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
  },
  { timestamps: true }
);

collectorSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Collector", collectorSchema);
