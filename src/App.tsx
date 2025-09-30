import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import MenuPage from "./pages/MenuPage/MenuPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import NewProductPage from "./pages/NewProductPage/NewProductPage";
import EditBlogPage from "./pages/EditBlogPage/EditBlogPage";
import UserOrderPage from "./pages/UserOrderPage/UserOrderPage";
import OrderInvoicePageWrapper from "./pages/OrderPage/OrderPageCom/OrderInvoicePage/OrderInvoicePageWrapper";
import NewBlogSection from "./pages/NewBlogPage/NewBlogPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/blogs" element={<BlogPage />} />

      <Route path="/new-product" element={<NewProductPage />} />
      <Route path="/new-blog" element={<NewBlogSection />} />
      <Route path="/edit-blog/:id" element={<EditBlogPage />} />

      {/* User Order page */}
      <Route path="/user-order/:id" element={<UserOrderPage />} />

      {/* Order invoice */}
      <Route
        path="/orders/:userId/:orderId"
        element={<OrderInvoicePageWrapper />}
      />
    </Routes>
  );
};

export default App;
