import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProductPage from "./pages/ProductPage/ProductPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/ProductPage" element={<ProductPage />} />
    </Routes>
  );
};

export default App;
