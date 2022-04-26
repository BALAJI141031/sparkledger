import "./App.css";
import { Header } from "./components";
import { HomeRoute, LedgersRoute } from "./routes";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/ledgers" element={<LedgersRoute />} />
      </Routes>
    </div>
  );
}

export default App;
