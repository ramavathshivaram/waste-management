const mongoose = require("mongoose");
const CollectorDailyStats = require("./models/collector-daily-stats-model");

const collectorId = new mongoose.Types.ObjectId("6947fb3af664370ada235a4b");

// Normalize date to start of day (important for unique index)
const startOfDay = (daysAgo = 0) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - daysAgo);
  return d;
};

const dummyStats = [
  // 📅 TODAY
  {
    collectorId,
    date: startOfDay(0),
    totalWasteKg: 190,
    totalDistanceKm: 33.4,
    workingMinutes: 420,
    pickups: {
      completedPickups: [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
      ],
      pendingPickups: [new mongoose.Types.ObjectId()],
      assinedPickups: [],
    },
  },

  // 📅 YESTERDAY
  {
    collectorId,
    date: startOfDay(1),
    totalWasteKg: 225,
    totalDistanceKm: 39.1,
    workingMinutes: 455,
    pickups: {
      completedPickups: [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
      ],
      pendingPickups: [],
      assinedPickups: [],
    },
  },

  // 📅 DAY BEFORE YESTERDAY
  {
    collectorId,
    date: startOfDay(2),
    totalWasteKg: 165,
    totalDistanceKm: 30.2,
    workingMinutes: 385,
    pickups: {
      completedPickups: [
        new mongoose.Types.ObjectId(),
        new mongoose.Types.ObjectId(),
      ],
      pendingPickups: [new mongoose.Types.ObjectId()],
      assinedPickups: [new mongoose.Types.ObjectId()],
    },
  },
];

async function initSeed() {
  await CollectorDailyStats.insertMany(dummyStats);
  console.log("Collector Daily Stats Seeded Successfully");
}


module.exports = initSeed;