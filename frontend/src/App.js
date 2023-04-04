import { useEffect, useState } from "react";
import React from "react";
import {
  Route,
  Routes,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import module from "./ApiService";
// Sentry API
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
// Components
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
import CreditPage from "./Components/CreditPage/CreditPage";
import NewCreator from "./Components/UserPage/NewCreator";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import StreamingListPage from "./Components/StreamingPage/StreamingListPage";
import ReadyPage from "./Components/StreamingPage/ReadyPage";
import StreamingPage from "./Components/StreamingPage/StreamingPage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
import ConfirmPage from "./Components/PurchasePage/ConfirmPage";
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/LoginPage/RegisterPage";
import AllCreators from "./Components/HomePage/AllCreators";
import AllStreams from "./Components/HomePage/AllStreams";
import AllPosted from "./Components/HomePage/AllPosted";
import UserPage from "./Components/UserPage/UserPage";
import CallbackPage from "./Components/LoginPage/CallbackPage";
// Style
import "./App.css";
import "./Components/cols.css";

// Enable Sentry to reach router context
Sentry.init({
  dsn: process.env.REACT_APP_DSN,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes
      ),
      tracePropagationTargets: [],
    }),
  ],
  tracesSampleRate: 1.0,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  const [UserId, setUserId] = useState("");
  const [CreatorId, setCreatorId] = useState(null);

  useEffect(() => {
    module.getUserId().then((res) => {
      if (res.data.user === undefined) return;
      // If the user is authenticated
      setUserId(res.data.user.id);
      // If the user is creator
      module
        .getCreatorByUserId(res.data.user.id)
        .then((res) => {
          if (res.error) return console.log(res.error);
          console.log(res.data);
          if (res.data.creator?.id) setCreatorId(res.data.creator.id);
        })
        .catch((e) => console.log(e));
    });
  }, []);

  return (
    <div className="App">
      <NavBar userId={UserId} />
      <SentryRoutes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/credits" element={<CreditPage />} />
        <Route path="/becomecreator" element={<NewCreator />} />
        {/* <Route path="/creators/:creatorId" element={<CreatorPage />} /> */}
        <Route path="/creators/:creatorId" element={<CreatorPage />} />
        <Route path="/purchase/:creatorId" element={<PurchasePage />} />
        <Route path="/purchase/confirm" element={<ConfirmPage />} />
        <Route path="/streaming" element={<StreamingListPage />} />
        <Route path="/allcreators" element={<AllCreators />} />
        <Route path="/allstreams" element={<AllStreams />} />
        <Route path="/allposted" element={<AllPosted />} />
        <Route path="/callback" element={<CallbackPage />} />
        {/* TODO */}
        {/* <Route path="/streaming/replay" element={<StreamingListPage />} /> */}
        <Route
          path="/streaming/:creatorId"
          element={
            UserId !== "" ? (
              CreatorId ? (
                <ReadyPage />
              ) : (
                <StreamingPage />
              )
            ) : (
              <div></div>
            )
          }
        />
        <Route path="/mypage" element={<UserPage />} />
      </SentryRoutes>
    </div>
  );
}

export default App;
