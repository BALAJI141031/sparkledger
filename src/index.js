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
} from "./Contexts";
// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NotifyUser>
        <DisplayNotesProvider>
          <WriteNoteProvider>
            <App />
          </WriteNoteProvider>
        </DisplayNotesProvider>
      </NotifyUser>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
