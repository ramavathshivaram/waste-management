import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import SearchBar from "../../components/citizen/SearchBar";
import { useCentresNearByLocations } from "../../hooks/use-centre-query.js";
import { Loader2 } from "lucide-react";

const Search = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchedCentre, setSearchedCentre] = useState("");

  /* 📍 Get user location */
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserLocation([coords.latitude, coords.longitude]);
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, []);

  /* 🏢 Fetch centres nearby (HOOK AT TOP LEVEL) */
  const { data, isLoading, error } = useCentresNearByLocations(
    userLocation
      ? {
          latitude: userLocation[0],
          longitude: userLocation[1],
        }
      : null
  );

  const centres = data?.data || [];

  /* 🔍 Search filtering */
  const filteredCentres = useMemo(() => {
    if (!searchedCentre) return centres;

    return centres.filter((c) =>
      c.name.toLowerCase().includes(searchedCentre.toLowerCase())
    );
  }, [centres, searchedCentre]);

  if (!userLocation) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 min-h-screen">
      {/* LEFT PANEL */}
      <div className="p-4 space-y-4 border-r">
        <SearchBar setSearchedCentre={setSearchedCentre} />

        {isLoading && <p>Loading nearby centres...</p>}
        {error && <p className="text-red-500">Failed to load centres</p>}

        {!isLoading && filteredCentres.length === 0 && (
          <p className="text-gray-500">No centres found</p>
        )}

        {/* Optional list view */}
        <ul className="space-y-2 text-sm">
          {filteredCentres.map((c) => (
            <li key={c._id} className="border p-2 rounded">
              {c.name}
            </li>
          ))}
        </ul>
      </div>

      {/* MAP PANEL */}
      <div className="lg:col-span-2 h-full">
        <MapContainer
          center={userLocation}
          zoom={14}
          className="w-full h-screen"
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User Marker */}
          <Marker position={userLocation}>
            <Popup>You are here 📍</Popup>
          </Marker>

          {/* Centres Markers */}
          {filteredCentres.map((centre) => (
            <Marker
              key={centre._id}
              position={[
                centre.location.coordinates[1],
                centre.location.coordinates[0],
              ]}
            >
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
