const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: String,

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
    },

    collectorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collector",
    },
    
  },
  { timestamps: true }
);

areaSchema.index({ area: "2dsphere" });

module.exports = mongoose.model("Area", areaSchema);
