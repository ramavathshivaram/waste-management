const agenda = require("../configs/agenda");

const {
  assignPickupToCollector,
  resetAllDailyPickupsToPending,
} = require("../controllers/agenda-controllers");

agenda.define("assign-pickup-to-collector", assignPickupToCollector);

agenda.define(
  "reset-all-daily-pickups-to-pending",
  resetAllDailyPickupsToPending
);



module.exports = agenda;