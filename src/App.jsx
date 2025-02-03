import { BrowserRouter, Route, Routes } from "react-router-dom";
import MapComponent from "./Components/MapComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={<MapComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;