import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function ConfirmPage() {
  let query = useQuery();

  useEffect(() => {
    const variables = {
      payment_intent: query.get("payment_intent"),
      payment_intent_client_secret: query.get("payment_intent_client_secret"),
      redirect_status: query.get("redirect_status"),
    };
  }, []);

  return <div>ConfirmPage</div>;
}

export default ConfirmPage;
