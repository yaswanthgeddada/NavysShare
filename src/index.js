import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./_context/AuthContext";

import { UserProvider } from "./_context/UserContext";

ReactDOM.render(
  <AuthProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </AuthProvider>,

  document.getElementById("root")
);
