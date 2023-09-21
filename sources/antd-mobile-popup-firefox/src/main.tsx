import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginPage } from "./Login";
import { HashRouter, useRoutes } from "react-router-dom";

const Router = () => {
  const element = useRoutes([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return element;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Router />
    </HashRouter>
  </React.StrictMode>,
);
