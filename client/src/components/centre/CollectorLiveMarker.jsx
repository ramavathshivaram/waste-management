import { Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import collectorIconImg from "@/assets/collector-truck.png";

// 🛻 Custom icon
const collectorIcon = new L.Icon({
  iconUrl: collectorIconImg,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const CollectorLiveMarker = ({ collectorId }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
     if (!collectorId) return;
     
     //sockets

  }, [collectorId]);

  if (!position) return null;

  return (
    <Marker position={position} icon={collectorIcon}>
      <Popup>
        <p className="font-semibold">Collector Live</p>
      </Popup>
    </Marker>
  );
};

export default CollectorLiveMarker;
