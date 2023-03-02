import { Route, Routes } from "react-router-dom";
// Components
import HomePage from "./Components/HomePage/HomePage";
// Style
import "./App.css";
import "./Components/cols.css";

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
