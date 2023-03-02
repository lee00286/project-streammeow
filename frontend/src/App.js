import { Route, Routes } from "react-router-dom";
// Components
import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Components/HomePage/HomePage";
// Style
import "./App.css";
import "./Components/cols.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* EXAMPLE: <Route path="/" element={<COMPONENT-NAME />} /> */}
        {/* <Route path="/signin" element={<COMPONENT-NAME />} /> */}
        {/* <Route path="/signup" element={<COMPONENT-NAME />} /> */}
      </Routes>
    </div>
  );
}

export default App;
