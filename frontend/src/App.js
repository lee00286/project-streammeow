import { Route, Routes } from "react-router-dom";
import axios from "axios";
// Components
import HomePage from "./Components/HomePage/HomePage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
// Style
import "./App.css";

// axios.defaults.proxy.host = "http://localhost:5001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* EXAMPLE: <Route path="/" element={<COMPONENT-NAME />} /> */}
        <Route path="/purchase" element={<PurchasePage />} />
      </Routes>
    </div>
  );
}

export default App;
