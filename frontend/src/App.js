import { Route, Routes } from "react-router-dom";
// Components
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import CreditPage from "./Components/CreditPage/CreditPage";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import StreamingPage from "./Components/StreamingPage/StreamingPage";
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
        <Route path="/credits" element={<CreditPage />} />
        <Route path="/creators" element={<CreatorPage />} />
        <Route path="/streaming/:streamId" element={<StreamingPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/purchase/confirm" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
