const mongoose = require("mongoose");

const centreDailyStatsSchema = new mongoose.Schema(
  {
    centreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Centre",
      required: true,
      index: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("CentreDailyStats", centreDailyStatsSchema);
