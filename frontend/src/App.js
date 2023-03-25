import { Route, Routes } from "react-router-dom";
// Components
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import CreditPage from "./Components/CreditPage/CreditPage";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import ReadyPage from "./Components/StreamingPage/ReadyPage";
import StreamingPage from "./Components/StreamingPage/StreamingPage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
import ConfirmPage from "./Components/PurchasePage/ConfirmPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/LoginPage/RegisterPage";
// Style
import "./App.css";
import "./Components/cols.css";

import ExamplePage from "./Components/StreamingPage/Items/ExamplePage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/credits" element={<CreditPage />} />
        <Route path="/creators" element={<CreatorPage />} />
        <Route path="/streaming" element={<ExamplePage />} />
        <Route path="/streaming/start" element={<ReadyPage />} />
        <Route path="/streaming/:streamId" element={<StreamingPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/purchase/confirm" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
