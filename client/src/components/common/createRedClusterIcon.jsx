import L from "leaflet";

const createRedClusterIcon = (cluster) => {
  const count = cluster.getChildCount();

  return L.divIcon({
    html: `
      <div class="red-cluster">
        ${count}
      </div>
    `,
    className: "", // IMPORTANT: remove default styles
    iconSize: L.point(40, 40, true),
  });
};

export default createRedClusterIcon;