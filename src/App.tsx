import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import ProductPage from "./pages/ProductPage/ProductPage";
import NewBlogPage from "./pages/NewBlogPage/NewBlogPage";
import UserOrderPage from "./pages/UserOrderPage/UserOrderPage";
import EditBlogPage from "./pages/EditBlogPage/EditBlogPage";
import NewProductPage from "./pages/NewProductPage/NewProductPage";

const App: React.FC = () => {
  return (
    <Routes>
      {/* Admin dashboard with blogs and add blog card */}
      <Route path="/" element={<AdminDashboard />} />

      {/* Product page */}
      <Route path="/ProductPage" element={<ProductPage />} />
      <Route path="/new-product" element={<NewProductPage />} />

      {/* New blog creation page */}
      <Route path="/new-blog" element={<NewBlogPage />} />
      <Route path="/edit-blog/:id" element={<EditBlogPage />} />

      {/* ,User Order creation page */}
      <Route path="/user-order/:id" element={<UserOrderPage />} />
    </Routes>
  );
};

export default App;
