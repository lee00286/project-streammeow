import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Auth0ProviderWithNavigate = ({ children }) => {
  const navigate = useNavigate();

  const domain =
    process.env.REACT_APP_AUTH0_DOMAIN || "dev-xz5orhy8rzrhzt80.us.auth0.com";
  const clientId =
    process.env.REACT_APP_AUTH0_CLIENT_ID || "akOnLy6JPjTfjgIchOofLqNBdkpQwuIh";
  const redirectUri =
    process.env.REACT_APP_AUTH0_CALLBACK_URL ||
    "http://localhost:3000/callback";
  const audience =
    process.env.REACT_APP_AUTH0_AUDIENCE || "https://streamoew-backend/api";

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri && audience)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
