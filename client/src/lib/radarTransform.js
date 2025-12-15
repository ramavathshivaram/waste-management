const clamp = (value, min = 0, max = 100) =>
  Math.max(min, Math.min(max, value));

export const dashboardToRadarData = (data) => {
  if (!data) return [];

  const pickupScore = clamp(
    (data.pickups.completed / data.pickups.total) * 100
  );

  const centreScore = clamp(data.centres.avgCapacityUsage);

  const collectorScore = clamp(data.collectors.avgEfficiency);

  const dumpSeverity =
    data.illegalDumps.high * 3 +
    data.illegalDumps.medium * 2 +
    data.illegalDumps.low * 1;

  const dumpScore = clamp(100 - dumpSeverity * 2);

  return [
    { metric: "Pickups", value: Math.round(pickupScore) },
    { metric: "Centres", value: Math.round(centreScore) },
    { metric: "Collectors", value: Math.round(collectorScore) },
    { metric: "Illegal Dumps", value: Math.round(dumpScore) },
  ];
};
