import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function CallbackPage() {
  const { user } = useAuth0();

  if (!user) {
    console.log("No user");
  }

  if (user) {
    module.Auth0Login(user.email, user.name, user.picture).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
      } else {
        console.log(res.err);
      }
    });
  }
  return <div></div>;
}

export default CallbackPage;
