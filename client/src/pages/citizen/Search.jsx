import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen bg-white text-black">
      {/* LEFT PANEL */}
      <div className="p-6 border-r border-black bg-white">
        <h1 className="text-2xl font-bold mb-4">Find Nearby Centres</h1>

        <Input
          placeholder="Search centres..."
          className="border border-black mb-4 text-black bg-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <ScrollArea className="h-[80vh] pr-3">
          {filteredCentres.map((centre) => (
            <Card
              key={centre.id}
              className="mb-3 border border-black hover:bg-black hover:text-white transition cursor-pointer"
              onClick={() => setSelectedCenter(centre)}
            >
              <CardHeader>
                <CardTitle>{centre.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{centre.address}</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* MAP PANEL */}
      <div className="lg:col-span-2 h-full">
        <MapContainer
          center={
            selectedCenter
              ? [selectedCenter.lat, selectedCenter.lng]
              : [16.5062, 80.648]
          }
          zoom={13}
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
