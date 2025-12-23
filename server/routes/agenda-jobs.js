const agenda = require("../configs/agenda");

const {
  assignPickupToCollector,
  assignAreasToNearbyCentres,
} = require("../controllers/agenda-controllers");

agenda.define("assign-pickup-to-collector", assignPickupToCollector);

agenda.define("assign-areas-to-nearby-centres", assignAreasToNearbyCentres);

module.exports = agenda;