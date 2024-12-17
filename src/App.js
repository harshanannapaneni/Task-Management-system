import { Route, Routes } from "react-router";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import React from "react";
import DashboardPage from "./pages/DashboardPage";


function App() {
  return (
    <div className="App">
      <h1>Task Management system</h1>
      <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
