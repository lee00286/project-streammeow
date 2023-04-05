import React, { useEffect, useState } from "react";
import {
  Navigate,
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
import LoginPage from "./Components/LoginPage/LoginPage";
import RegisterPage from "./Components/LoginPage/RegisterPage";
import CreditPage from "./Components/CreditPage/CreditPage";
import AllCreators from "./Components/HomePage/AllCreators";
import AllStreams from "./Components/HomePage/AllStreams";
import AllPosted from "./Components/HomePage/AllPosted";
import NewCreator from "./Components/UserPage/NewCreator";
import CreatorPage from "./Components/CreatorPage/CreatorPage";
import ReadyPage from "./Components/StreamingPage/ReadyPage";
import StreamingPage from "./Components/StreamingPage/StreamingPage";
import StreamingListPage from "./Components/StreamingPage/StreamingListPage";
import PurchasePage from "./Components/PurchasePage/PurchasePage";
import ConfirmPage from "./Components/PurchasePage/ConfirmPage";
import UserPage from "./Components/UserPage/UserPage";
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

function Loading() {
  return <div>Loading...</div>;
}

function App() {
  // Determine whether the page is loading or not
  const [IsLoading, setIsLoading] = useState(true);
  // User authentication information
  const [UserId, setUserId] = useState(null);
  const [CreatorId, setCreatorId] = useState(null);

  useEffect(() => {
    module.getUserId().then((res) => {
      // If the user is not authenticated
      if (res.data.user === undefined) {
        setUserId(null);
        setIsLoading(false);
        return;
      }
      // If the user is authenticated
      setUserId(res.data.user.id);
      // If the user is creator
      module
        .getCreatorByUserId(res.data.user.id)
        .then((res) => {
          if (res.error) return console.log(res.error);
          if (res.data.creator?.id) setCreatorId(res.data.creator.id);
          else setCreatorId(null);
          setIsLoading(false);
        })
        .catch(
          (e) => e.response?.data?.error && console.log(e.response.data.error)
        );
    });
  }, []);

  // Check if the user is at required auth level
  const auth = (isNone, isUser, isCreator, childOne, childTwo = null) => {
    // If User, return childOne, if Creator, return childTwo
    if (childTwo !== null) {
      if (UserId && !CreatorId) return childOne;
      if (UserId && CreatorId) return childTwo;
      return <Navigate to="/" />;
    }

    // User should not be authenticated
    if (isNone && !UserId) {
      return childOne;
    }

    // User should be authenticated
    if (isUser && UserId) {
      if (isCreator === null) return childOne;
      if (isCreator === false && !CreatorId) return childOne;
      if (isCreator && CreatorId) return childOne;
    }

    // If the user is not at required auth permission
    return <Navigate to="/" />;
  };

  return (
    <div className="App">
      <NavBar userId={UserId} creatorId={CreatorId} />
      <SentryRoutes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signin"
          element={
            IsLoading ? <Loading /> : auth(true, false, null, <LoginPage />)
          }
        />
        <Route
          path="/signup"
          element={
            IsLoading ? <Loading /> : auth(true, false, null, <RegisterPage />)
          }
        />
        <Route path="/credits" element={<CreditPage />} />
        <Route path="/allcreators" element={<AllCreators />} />
        <Route path="/allstreams" element={<AllStreams />} />
        <Route path="/allposted" element={<AllPosted />} />
        <Route
          path="/becomecreator"
          element={
            IsLoading ? <Loading /> : auth(false, true, false, <NewCreator />)
          }
        />
        <Route
          path="/creators/:creatorId"
          element={
            IsLoading ? <Loading /> : auth(false, true, null, <CreatorPage />)
          }
        />
        <Route
          path="/purchase/:creatorId"
          element={
            IsLoading ? <Loading /> : auth(null, true, null, <PurchasePage />)
          }
        />
        <Route
          path="/purchase/confirm"
          element={
            IsLoading ? <Loading /> : auth(null, true, null, <ConfirmPage />)
          }
        />
        <Route path="/streaming" element={<StreamingListPage />} />
        {/* <Route path="/streaming/replay" element={<StreamingListPage />} /> */}
        <Route
          path="/streaming/:creatorId"
          element={
            IsLoading ? (
              <Loading />
            ) : (
              auth(null, null, null, <StreamingPage />, <ReadyPage />)
            )
          }
        />
        <Route
          path="/mypage"
          element={
            IsLoading ? <Loading /> : auth(null, true, null, <UserPage />)
          }
        />
      </SentryRoutes>
    </div>
  );
}

export default App;
