import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProductPage from "./pages/ProductPage/ProductPage";
import NewBlogSection from "./pages/NewBlogSection/NewBlogSection";
import UserOrderPage from "./pages/UserOrderPage/UserOrderPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Admin dashboard with blogs and add blog card */}
      <Route path="/" element={<AdminDashboard />} />

      {/* Product page */}
      <Route path="/ProductPage" element={<ProductPage />} />

      {/* New blog creation page */}
      <Route path="/new-blog" element={<NewBlogSection />} />
      {/* <Route path="/new-blog/:id" element={<NewBlogSection />} /> */}

      {/* ,User Order creation page */}
      <Route path="/user-order/:id" element={<UserOrderPage />} />
    </Routes>
  );
};

export default App;
