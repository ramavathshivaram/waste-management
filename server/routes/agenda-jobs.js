const agenda = require("../configs/agenda");

const {
  updateDailyStats,
  assignAreasToNearbyCentres,
} = require("../controllers/agenda-controllers");

agenda.define("update-daily-stats", updateDailyStats);

agenda.define("assign-areas-to-nearby-centres", assignAreasToNearbyCentres);

module.exports = agenda;