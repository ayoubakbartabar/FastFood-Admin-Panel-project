import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import MenuPage from "./pages/MenuPage/MenuPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import BlogPage from "./pages/BlogPage/BlogPage";

import EditBlogPage from "./pages/BlogPage/BlogPageCom/EditBlogPage/EditBlogPage";

import OrderInvoicePageWrapper from "./pages/OrderPage/OrderPageCom/OrderInvoicePage/OrderInvoicePageWrapper";

import ProductPage from "./pages/ProductPage/ProductPage";
import NewProductPage from "./pages/ProductPage/ProductPageCom/NewProductPage/NewProductPage";
import NewBlogSection from "./pages/BlogPage/BlogPageCom/NewBlogPage/NewBlogPage";
import UserOrderPage from "./pages/OrderPage/OrderPageCom/UserOrderPage/UserOrderPage";
import SettingPage from "./pages/SettingPage/SettingPage";
import NavbarPage from "./pages/NavbarPage/NavbarPage";
import FooterPage from "./pages/FooterPage/FooterPage";
import HomePaginationPage from "./pages/HomePaginationPage/HomePaginationPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/blogs" element={<BlogPage />} />
      <Route path="/setting" element={<SettingPage />} />
      <Route path="/navbar-page" element={<NavbarPage />} />
      <Route path="/footer-page" element={<FooterPage />} />
      <Route path="/home-pagination-page" element={<HomePaginationPage />} />

      <Route path="/new-product" element={<NewProductPage />} />
      <Route path="/edit-product-page/:id" element={<ProductPage />} />

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
