const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");
const Pickup = require("../models/pickup-model");
const Area = require("../models/area-model");
const { getPolygonCentroid } = require("../lib/utils");
const CollectorDailyStats = require("../models/collector-daily-stats-model");
const CentreDailyStats = require("../models/centre-daily-stats-model");
const CitizenDailyStats = require("../models/citizen-daily-stats-model");

const updateDailyStats = async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const areas = await Area.find().select("_id collectorId centreId").lean();

    for (const area of areas) {
      const { _id, collectorId, centreId } = area;

      if (!collectorId || !centreId) continue;

      // Fetch pickups
      const pickups = await Pickup.find({
        "area.id": _id,
        $or: [
          { mode: "daily" },
          { mode: "once", status: { $ne: "completed" } },
        ],
      })
        .select("_id citizenId")
        .lean();

      if (!pickups.length) continue;

      const pickupIds = pickups.map((p) => p._id);

      // Assign pickups (same logic)
      await Pickup.updateMany(
        { _id: { $in: pickupIds } },
        {
          $set: {
            status: "assigned",
            otp: Math.floor(1000 + Math.random() * 9000),
          },
        }
      );

      //! BULK WRITE OPERATIONS FOR DAILY STATS MODELS

      const collectorBulk = [
        {
          updateOne: {
            filter: { collectorId, date: today },
            update: {
              $addToSet: {
                "pickups.assignedPickups": { $each: pickupIds },
                "pickups.pendingPickups": { $each: pickupIds },
              },
            },
            upsert: true,
          },
        },
      ];

      const centreBulk = [
        {
          updateOne: {
            filter: { centreId, date: today },
            update: {
              $addToSet: {
                "pickups.pendingPickups": { $each: pickupIds },
              },
            },
            upsert: true,
          },
        },
      ];

      const citizenBulk = pickups.map((pickup) => ({
        updateOne: {
          filter: { citizenId: pickup.citizenId, date: today },
          update: {
            $addToSet: {
              "pickups.pendingPickups": pickup._id,
            },
          },
          upsert: true,
        },
      }));

      //! Execute all bulks
      await Promise.all([
        CollectorDailyStats.bulkWrite(collectorBulk, { ordered: false }),
        CentreDailyStats.bulkWrite(centreBulk, { ordered: false }),
        citizenBulk.length
          ? CitizenDailyStats.bulkWrite(citizenBulk, { ordered: false })
          : Promise.resolve(),
      ]);

      console.log(
        `Assigned ${pickupIds.length} pickups -> collector ${collectorId}`
      );
      console.log(`Assigned ${pickupIds.length} pickups -> centre ${centreId}`);
    }
  } catch (error) {
    console.error("Assign pickup error:", error);
  }
};

const assignAreasToNearbyCentres = async () => {
  try {
    const areas = await Area.find().select("_id area.coordinates").lean();

    if (!areas.length) return;

    const bulkOps = [];

    for (const area of areas) {
      const centroid = getPolygonCentroid(area.area.coordinates);

      const centre = await Centre.findOne({
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: centroid,
            },
            $maxDistance: 30000, // 30km
          },
        },
      }).select("_id");

      if (!centre) continue;

      bulkOps.push({
        updateOne: {
          filter: {
            _id: area._id,
          },
          update: {
            $set: { centreId: centre._id },
          },
        },
      });
    }

    if (bulkOps.length) {
      const result = await Area.bulkWrite(bulkOps, {
        ordered: false,
      });

      console.log("Bulk area-centre assignment result:", {
        matched: result.matchedCount,
        modified: result.modifiedCount,
      });
    }
  } catch (error) {
    console.error("Assign areas to centres error:", error);
  }
};

module.exports = {
  updateDailyStats,
  assignAreasToNearbyCentres,
};
