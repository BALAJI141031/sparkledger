import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  WriteNoteProvider,
  DisplayNotesProvider,
  NotifyUser,
  AuthProvider,
} from "./Contexts";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotifyUser>
          <DisplayNotesProvider>
            <WriteNoteProvider>
              <App />
            </WriteNoteProvider>
          </DisplayNotesProvider>
        </NotifyUser>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
