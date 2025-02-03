import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Haversine formula to calculate distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Predefined data for metro stations and bus stops
const transportData = [
  { name: "Metro Station A", location: [40.7128, -74.006], type: "metro" },
  { name: "Bus Stop B", location: [40.7306, -73.9352], type: "bus" },
  { name: "Metro Station C", location: [40.7589, -73.9851], type: "metro" },
  { name: "Bus Stop D", location: [40.7484, -73.9857], type: "bus" },
];

const MapComponent = ({ onTransportClick, selectedTransportLocation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [closestTransport, setClosestTransport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMapVisible, setIsMapVisible] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        setUserLocation([latitude, longitude]);
        setAccuracy(accuracy);
      },
      () => setError("Unable to retrieve your location"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (userLocation && transportData.length > 0) {
      let closest = null;
      let minDistance = Infinity;

      for (const transport of transportData) {
        const distance = haversineDistance(
          userLocation[0],
          userLocation[1],
          transport.location[0],
          transport.location[1]
        );
        if (distance < minDistance) {
          minDistance = distance;
          closest = transport;
        }
      }

      setClosestTransport(closest);
    }
  }, [userLocation]);

  useEffect(() => {
    setLoading(false);
  }, [userLocation]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-5">{error}</div>;

  return (
    <div className="flex flex-col items-center mt-5 min-h-screen">
      <button
        onClick={() => setIsMapVisible(!isMapVisible)}
        className="mb-3 px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        {isMapVisible ? "Hide Map" : "Show Map"}
      </button>
      {isMapVisible && userLocation && (
        <div className="w-4/5 h-[60vh] rounded-lg overflow-hidden shadow-lg">
          <MapContainer center={userLocation} zoom={13} className="w-full h-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={userLocation}>
              <Popup>
                You are here! <br /> Accuracy:{" "}
                {accuracy ? `${accuracy.toFixed(2)} meters` : "Calculating..."}
              </Popup>
            </Marker>
            {transportData.map((transport, index) => (
              <Marker
                key={index}
                position={transport.location}
                eventHandlers={{
                  click: () => onTransportClick(transport.location),
                }}
              >
                <Popup>
                  {transport.name} <br />
                  Type: {transport.type}
                </Popup>
              </Marker>
            ))}
            {closestTransport && (
              <RoutingLine
                start={userLocation}
                end={closestTransport.location}
              />
            )}
            <RecenterAutomatically
              location={selectedTransportLocation || userLocation}
            />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

const RoutingLine = ({ start, end }) => {
  const map = useMap();
  useEffect(() => {
    if (start && end) {
      L.Routing.control({
        waypoints: [L.latLng(start), L.latLng(end)],
        createMarker: () => null, // Disable default markers
        lineOptions: {
          styles: [{ color: "blue", weight: 4 }],
        },
        show: false, // Hide the default routing instructions
      }).addTo(map);
    }
  }, [start, end, map]);
  return null;
};

const RecenterAutomatically = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView(location, 13);
    }
  }, [location, map]);
  return null;
};

export default MapComponent;