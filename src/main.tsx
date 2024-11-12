import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Navigate, createRoutesFromElements, createHashRouter, RouterProvider } from "react-router-dom";

import "./main.css";

const Layout = lazy(() => import("@/layout"));
const Home = lazy(() => import("@/pages/home"));
const Package = lazy(() => import("@/pages/package"));
const Packages = lazy(() => import("@/pages/packages"));
const Settings = lazy(() => import("@/pages/settings"));

const router = createHashRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="packages">
          <Route index element={<Packages />} />
          <Route path=":id" element={<Package />} />
        </Route>
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
