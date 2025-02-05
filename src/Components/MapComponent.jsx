// src/Map.js
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { v4 as uuidv4 } from "uuid";
import citiesData from "../Data/citiesData";
import MapMarker from "./Abhishek/MapMarker";
import MapSidebar from "./Abhishek/MapSidebar";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 27.4955539,
    longitude: 77.6855554,
    width: "100vw",
    height: "100vh",
    zoom: 10,
  });
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div
        style={{
          position: "absolute",
          // top: "80px", // Adjust based on Navbar height
          // left: "20px",
          width: "350px", // Adjust width as needed
          zIndex: 10,
        }}
      >
        <MapSidebar />
      </div>
      <div>
        <ReactMapGL
          {...viewPort}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          onViewportChange={(viewPort) => {
            setViewPort(viewPort);
          }}
        >
          {citiesData.cities.map((city) => (
            <Marker
              key={city.name}
              latitude={city.latitude}
              longitude={city.longitude}
            >
              <div>
                {" "}
                <MapMarker
                  location={city.name}
                  imageSrc={"/toronto.webp"}
                  reviews={120}
                />{" "}
                {/* {city.name} */}
              </div>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    </div>
  );
};

export default MapComponent;
