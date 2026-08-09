import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PlayersPage from "./pages/PlayersPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="pz-app">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<PlayersPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
