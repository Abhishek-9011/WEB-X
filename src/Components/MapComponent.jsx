import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import citiesData from "../Data/citiesData";
import MapSidebar from "./Abhishek/MapSidebar";
import MapMarker from "./Abhishek/MapMarker";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const [viewPort, setViewPort] = useState({
    latitude: 27.4955539,
    longitude: 77.6855554,
    zoom: 10,
  });

  const [selectedCity, setSelectedCity] = useState(null);

  // Get zoom level from the viewport state
  const zoom = viewPort.zoom;

  // Adjust marker size based on zoom level with a gradual increase when zooming out
  const markerSize = zoom > 12 ? 40 : zoom > 10 ? 35 : zoom > 8 ? 30 : 25;

  return (
    <div className="relative w-screen h-screen">
      {/* Sidebar */}
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

      {/* Map */}
      <ReactMapGL
        {...viewPort}
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={
          "mapbox://styles/sharadsinghcha-cs22/cm6s7km2j014n01r5h6te59x4"
        }
        onViewportChange={(newViewPort) => setViewPort(newViewPort)}
        className="w-full h-full"
      >
        {citiesData.cities.map((city) => (
          <div key={city.name}>
            {/* Location Marker */}
            <Marker latitude={city.latitude} longitude={city.longitude}>
              <div
                className="bg-[#0a0a0a] border-1 border-white rounded-full flex items-center justify-center shadow-md cursor-pointer"
                style={{
                  height: `${markerSize}px`,
                  width: `${markerSize}px`,
                }} // Dynamically adjust marker size
                onClick={() =>
                  setSelectedCity(
                    selectedCity?.name === city.name ? null : city
                  )
                } // Toggle Popup
              >
                <img
                  className="h-6 w-6"
                  src="/location.png"
                  alt="Location Marker"
                />
              </div>
            </Marker>

            {/* Popup without White Border */}
            {selectedCity?.name === city.name && (
              <Popup
                latitude={city.latitude}
                longitude={city.longitude}
                closeButton={false}
                closeOnClick={true}
                onClose={() => setSelectedCity(null)}
                anchor="right"
                className="!bg-transparent !shadow-none border-none p-0 m-0" // Fix border issue
                offset={[10, -20]} // Adjust positioning
              >
                <div className="p-0 m-0"> 
                  {/* Custom MapMarker Component */}
                  <MapMarker
                    location={city.name}
                    imageSrc={"/toronto.webp"}
                    reviews={120}
                  />
                </div>
              </Popup>
            )}
          </div>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default MapComponent;
