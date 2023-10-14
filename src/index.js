import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.render(
  <GoogleOAuthProvider clientId="1003341418087-u2uk3rra2f5a3mcm6t8nrvku816pivpg.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>,
  document.getElementById("root")
);
