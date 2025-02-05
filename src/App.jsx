import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapComponent from "./Components/MapComponent";
import MapSidebar from "./Components/Abhishek/MapSidebar";
import MapMarker from "./Components/Abhishek/MapMarker";
import Navbar from "./Components/Abhishek/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar location={"Canada"} />
    {/* <MapSidebar /> */}
      <Routes>
        <Route path="/map" element={<MapComponent />} />
        <Route path="/aa" element={<MapMarker imageSrc={"/museum.jpeg"} location={"Mathura Township"} reviews={150}/>} />
        <Route path="/sidebar" element={<MapSidebar/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;