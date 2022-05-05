import "./App.css";
import { Header } from "./components";
import {
  HomeRoute,
  LedgersRoute,
  LedgerRoute,
  LoginRoute,
  SignupRoute,
} from "./routes";

import Mockman from "mockman-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATHS } from "./config/constants";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={PATHS.HOME} element={<HomeRoute />} />
        <Route path={PATHS.LEDGERS} element={<LedgersRoute />} />
        <Route path={PATHS.MOCK} element={<Mockman />} />
        <Route path={PATHS.WRITE_LEDGER} element={<LedgerRoute />} />
        <Route path={PATHS.LOGIN} element={<LoginRoute />} />
        <Route path={PATHS.SIGNUP} element={<SignupRoute />} />
      </Routes>
    </div>
  );
}

export default App;
