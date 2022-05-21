import "./App.css";
import { Header } from "./components";
import {
  HomeRoute,
  LedgersRoute,
  LedgerRoute,
  LoginRoute,
  SignupRoute,
  NotFoundRoute,
} from "./routes";
import { RequireAuth } from "./config/authentication";

import Mockman from "mockman-js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PATHS } from "./config/constants";
function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={PATHS.HOME} element={<HomeRoute />} />
        <Route
          path={PATHS.LEDGERS}
          element={
            <RequireAuth>
              <LedgersRoute />
            </RequireAuth>
          }
        />
        <Route path={PATHS.MOCK} element={<Mockman />} />
        <Route
          path={PATHS.WRITE_LEDGER}
          element={
            <RequireAuth>
              <LedgerRoute />
            </RequireAuth>
          }
        />
        <Route path={PATHS.LOGIN} element={<LoginRoute />} />
        <Route path={PATHS.SIGNUP} element={<SignupRoute />} />
        <Route path={PATHS.RANDOM} element={<NotFoundRoute />} />
      </Routes>
    </div>
  );
}

export default App;
