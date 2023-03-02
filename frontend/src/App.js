import { Route, Routes } from "react-router-dom";
import axios from "axios";
// Components
import HomePage from "./Components/HomePage/HomePage";
// Style
import "./App.css";

// axios.defaults.proxy.host = "http://localhost:5001";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* EXAMPLE: <Route path="/" element={<COMPONENT-NAME />} /> */}
      </Routes>
    </div>
  );
}

export default App;
