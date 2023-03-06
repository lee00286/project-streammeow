import { Route, Routes } from "react-router-dom";
import axios from "axios";
// Components
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
import ConfirmPage from "./Components/PurchasePage/ConfirmPage";
// Style
import "./App.css";
import "./Components/cols.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/signin" element={<COMPONENT-NAME />} /> */}
        {/* <Route path="/signup" element={<COMPONENT-NAME />} /> */}
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/purchase/confirm" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
