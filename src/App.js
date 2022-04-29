import "./App.css";
import { Header } from "./components";
import { HomeRoute, LedgersRoute, LedgerRoute } from "./routes";
import Mockman from "mockman-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/ledgers" element={<LedgersRoute />} />
        <Route path="/mock" element={<Mockman />} />
        <Route path="/write/ledger" element={<LedgerRoute />} />
      </Routes>
    </div>
  );
}

export default App;
