import { Route, Routes } from "react-router-dom";
// Components
import HomePage from "./Components/HomePage/HomePage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
// Style
import "./App.css";

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
