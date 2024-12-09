import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Navigate, createRoutesFromElements, createHashRouter, RouterProvider } from "react-router-dom";

import "./main.css";

import Layout from "./layout";
import Home from "@/pages/home";
import Package from "@/pages/package";
import Settings from "@/pages/settings";

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":id" element={<Package />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace={true} />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
