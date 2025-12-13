import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Fake centers (later connect to backend)
const centres = [
  {
    id: 1,
    name: "PVPSIT Recycling Centre",
    address: "Kanuru, Vijayawada",
    lat: 16.4833,
    lng: 80.6663,
  },
  {
    id: 2,
    name: "NTR Circle Plastic Hub",
    address: "Benz Circle, Vijayawada",
    lat: 16.5062,
    lng: 80.648,
  },
  {
    id: 3,
    name: "Singareni Metal Recycle",
    address: "Auto Nagar",
    lat: 16.4986,
    lng: 80.68,
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCenter, setSelectedCenter] = useState(null);

  const filteredCentres = centres.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      {/* LEFT PANEL */}

      {/* MAP PANEL */}
      <div className="lg:col-span-2 h-full">
        <MapContainer
          center={
            selectedCenter
              ? [selectedCenter.lat, selectedCenter.lng]
              : [16.5062, 80.648]
          }
          zoom={15}
          className="w-full h-screen grayscale"
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {filteredCentres.map((centre) => (
            <Marker key={centre.id} position={[centre.lat, centre.lng]}>
              <Popup>
                <strong>{centre.name}</strong>
                <br />
                {centre.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Search;
