const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");
const Pickup = require("../models/pickup-model");
const Area = require("../models/area-model");

const assignPickupToCollector = async () => {
  try {
    const areas = await Area.find({});
    for (const area of areas) {
      const pickups = await Pickup.find({
        mode: "daily",
      });

      console.log(pickups);
    }
  } catch (error) {
    console.log(error);
  }
};

const resetAllDailyPickupsToPending = async () => {
  try {
    const result = await Pickup.updateMany(
      { mode: "daily" },
      {
        $set: {
          status: "pending",
        },
      }
    );

    console.log(`Reset ${result.modifiedCount} daily pickups`);
  } catch (error) {
    console.error("Reset error:", error);
  }
};

module.exports = {
  resetAllDailyPickupsToPending,
  assignPickupToCollector,
};
