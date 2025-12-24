const mongoose = require("mongoose");

const centreDailyStatsSchema = new mongoose.Schema(
  {
    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Centre",
      required: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
      index: true,
    },

    pickups: {
      receiving: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PickupRequest",
        },
      ],
      pending: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PickupRequest",
        },
      ],
      completed: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PickupRequest",
        },
      ],
    },
  },

  { timestamps: true }
);

centreDailyStatsSchema.index({ centreId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("CentreDailyStats", centreDailyStatsSchema);
