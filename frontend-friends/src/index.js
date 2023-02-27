import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.scss";
import Statistics from "./routes/Statistics";
import Root from "./routes/root";
import Input from "./routes/input/Input";

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Root />,
  },
  {
    path: "/statistik",
    element: <Statistics />,
  },
  {
    path: "/",
    element: <Input />,
  },
  {
    path: "/lista",
    element: <div />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
