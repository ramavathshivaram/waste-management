const dashboardToLineData = (dailyStats = []) => {
  return dailyStats.map((day) => ({
    date: day.date,
    pickups: day.pickups.completed,
    collectors: day.collectors.active,
    centres: day.centres.active,
    illegalDumps: day.illegalDumps.total,
  }));
};

export default dashboardToLineData;