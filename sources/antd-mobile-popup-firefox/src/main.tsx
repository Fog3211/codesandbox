import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginPage } from "./Login";
import { BrowserRouter, useRoutes } from "react-router-dom";

const Router = () => {
  const element = useRoutes([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <App />,
    },
  ]);

  return element;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>,
);
