import React, { useEffect } from "react";
import axios from "axios";

/**
 * Home page component.
 * @returns Home page component
 */
function HomePage() {
  useEffect(() => {
    // Example usage of axios
    axios.get("/api/test").then((res) => {
      console.log(res);
    });
  }, []);

  return <div className="grid-body">HomePage</div>;
}

export default HomePage;
