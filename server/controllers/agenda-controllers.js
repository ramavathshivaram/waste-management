const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");
const Pickup = require("../models/pickup-model");
const Area = require("../models/area-model");
const { getPolygonCentroid } = require("../lib/utils");
const CollectorDailyStats = require("../models/collector-daily-stats-model");

const assignPickupToCollector = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const areas = await Area.find({
      collectorId: { $ne: null },
    }).lean();

    for (const area of areas) {
      const collectorId = area.collectorId;

      // ✅ Correct pickup query
      const pickups = await Pickup.find({
        areaId: area._id,
        $or: [{ mode: "daily" }, { mode: "once", status: "pending" }],
      }).select("_id");

      if (!pickups.length) continue;

      const pickupIds = pickups.map((p) => p._id);

      // ✅ Update pickups
      await Pickup.updateMany(
        { _id: { $in: pickupIds } },
        {
          $set: {
            status: "assigned",
            otp: Math.floor(1000 + Math.random() * 9000),
          },
        }
      );

      // ✅ Update collector daily stats (UPSERT)
      await CollectorDailyStats.findOneAndUpdate(
        { collectorId, date: today },
        {
          $addToSet: {
            "pickups.assignedPickups": { $each: pickupIds },
            "pickups.pendingPickups": { $each: pickupIds },
          },
        },
        { upsert: true, new: true }
      );

      console.log(
        `Assigned ${pickupIds.length} pickups to collector ${collectorId}`
      );
    }
  } catch (error) {
    console.error("Assign pickup error:", error);
  }
};

const assignAreasToNearbyCentres = async () => {
  try {
    const areas = await Area.find().lean();

    for (const area of areas) {
      const centroid = getPolygonCentroid(area.area.coordinates);

      const nearbyCentre = await Centre.find({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: centroid,
            },
            $maxDistance: 30000, // 30 KM
          },
        },
      }).limit(1);

      if (nearbyCentre.length) {
        await Area.updateOne(
          { _id: area._id },
          { $set: { centreId: nearbyCentre[0]._id } }
        );
        console.log(
          `Assigned area ${area.name} to centre ${nearbyCentre[0].name}`
        );
      }
    }
  } catch (error) {
    console.error("Assign areas to centres error:", error);
  }
};

module.exports = {
  assignPickupToCollector,
  assignAreasToNearbyCentres,
};
