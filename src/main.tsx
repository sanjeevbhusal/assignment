import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SpellInfo } from "./components/SpellInfo.tsx";
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/spells" />} />
        <Route path="/spells" element={<App />} />
        <Route path="/spells/:spellId" element={<SpellInfo />} />
      </Routes>
    </BrowserRouter>
    <Toaster richColors />
  </React.StrictMode>
);
