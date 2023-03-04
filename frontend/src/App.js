import { Route, Routes } from "react-router-dom";
import axios from "axios";
// Components
import HomePage from "./Components/HomePage/HomePage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
import ConfirmPage from "./Components/PurchasePage/ConfirmPage";
// Style
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* EXAMPLE: <Route path="/" element={<COMPONENT-NAME />} /> */}
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/purchase/confirm" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
