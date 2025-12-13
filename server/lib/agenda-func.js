const Collector = require("../models/collector-model");
const Centre = require("../models/centre-model");
const Pickup = require("../models/pickup-model");

const assignPickupToCollector = async () => {
  try {
    const pickups = await Pickup.find(
      { isCompleted: false },
      {
        _id: true,
        location: true,
      }
    );

    const collectors = await Collector.find(
      { isApproved: true },
      {
        _id: true,
        location: true,
      }
    );

    const centres = await Centre.find(
      { isApproved: false },
    );

    // console.log(centres)

    const count = pickups.length / collectors.length;

    //todo : base on the count assign no of pickups to collcetors and in best path
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  assignPickupToCollector,
};
