const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    area: {
      type: {
        type: String,
        enum: ["Polygon"],
        required: true,
      },
      coordinates: {
        type: [[[Number]]], //// [[ [lng, lat], [lng, lat], ... ]   , [ [lng, lat], [lng, lat], ... ] ]
        required: true,
      },
    },

    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Centre",
      default: null,
    },

    collectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collector",
      default: null,
    },
  },
  { timestamps: true }
);

areaSchema.index({ area: "2dsphere" });

module.exports = mongoose.model("Area", areaSchema);
