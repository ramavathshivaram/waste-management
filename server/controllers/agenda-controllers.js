const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");
const Pickup = require("../models/pickup-model");
const Area = require("../models/area-model");

const assignPickupToCollector = async () => {
  try {
    const areas = await Area.find({});

    for (const area of areas) {
      console.log("area", area._id);

      const pickups = await Pickup.find({
        mode: "daily",
      });

      if (pickups.length === 0) {
        // console.log("No daily pickups found for area", area._id);
        continue;
      }

      const collectorId = area.collectorId;
      console.log("collect", collectorId);
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
