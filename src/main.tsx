import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import "./main.css";

import Layout from "./layout";
import Home from "@/pages/home";
import Package from "@/pages/package";
import Packages from "@/pages/packages";
import Settings from "@/pages/settings";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="packages">
            <Route index element={<Packages />} />
            <Route path=":id" element={<Package />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </HashRouter>
  </StrictMode>
);
