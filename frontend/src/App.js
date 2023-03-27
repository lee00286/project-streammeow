import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import module from "./ApiService";
// Components
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import CreditPage from "./Components/CreditPage/CreditPage";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import StreamingListPage from "./Components/StreamingPage/StreamingListPage";
import ReadyPage from "./Components/StreamingPage/ReadyPage";
import StreamingPage from "./Components/StreamingPage/StreamingPage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
import ConfirmPage from "./Components/PurchasePage/ConfirmPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/LoginPage/RegisterPage";
// Style
import "./App.css";
import "./Components/cols.css";

function App() {
  const [UserId, setUserId] = useState("");
  const [IsCreator, setIsCreator] = useState(false);

  useEffect(() => {
    // Get user id
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      setUserId(res.data.user.id);
      // TODO: Change after creator field is created in User
      setIsCreator(res.data.user.id === 1);
    });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/credits" element={<CreditPage />} />
        <Route path="/creators" element={<CreatorPage />} />
        <Route path="/streaming" element={<StreamingListPage />} />
        {/* TODO */}
        {/* <Route path="/streaming/replay" element={<StreamingListPage />} /> */}
        <Route
          path="/streaming/:creatorId"
          element={
            UserId !== "" ? (
              IsCreator ? (
                <ReadyPage />
              ) : (
                <StreamingPage />
              )
            ) : (
              <div></div>
            )
          }
        />
        <Route path="/purchase/:creatorId" element={<PurchasePage />} />
        <Route path="/purchase/confirm" element={<ConfirmPage />} />
      </Routes>
    </div>
  );
}

export default App;
