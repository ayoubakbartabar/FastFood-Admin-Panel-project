import React, { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../../types/server/productApi";
import type { Product as ApiProduct } from "../../../types/server/productApi";

import ProductCartSection from "../ProductCartSection/ProductCartSection";
import type { Product } from "../ProductCartSection/ProductCartSection";

import "./DashboardContent.css";
import BlogsSection from "../../../pages/BlogsSection/BlogsSection";
import OrderSection from "../../../pages/OrderSection/OrderSection";
import axios from "axios";

// Define props for DashboardContent
interface DashboardContentProps {
  activePage: string;
}

// Define User type from API
interface User {
  id: string;
  name: string;
  email: string;
  orders: any[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
  const [selectedUserName, setSelectedUserName] = useState<string>("");

  // Fetch products only once (when Menu page is active)
  const fetchProducts = useCallback(async () => {
    try {
      const data: ApiProduct[] = await getProducts();

      const mapped: Product[] = data.map((p) => ({
        ...p,
        sku: p.sku ?? "N/A",
      }));

      // Delay to simulate loading
      setTimeout(() => {
        setProducts(mapped);
        setLoading(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setLoading(false);
    }
  }, []);

  // Fetch users from API for Orders page
  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/users");
      setUsers(data);
      if (data.length > 0) {
        setSelectedUserName(data[0].name); // Select first user by default
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // Fetch data depending on active page
  useEffect(() => {
    if (activePage === "Menu") {
      fetchProducts();
    }
    if (activePage === "Orders") {
      fetchUsers();
    }
  }, [activePage, fetchProducts, fetchUsers]);

  return (
    <div className="dashboard-content">
      {/* Dashboard welcome section */}
      {activePage === "Dashboard" && (
        <h1>Welcome to FastFood TNC Admin Panel</h1>
      )}

      {/* Menu page with product list */}
      {activePage === "Menu" && (
        <ProductCartSection products={products} loading={loading} />
      )}

      {/* Orders page */}
      {activePage === "Orders" && (
        <>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : !selectedUserName ? (
            <p>No users found</p>
          ) : (
            <OrderSection />
          )}
        </>
      )}

      {/* Blogs page */}
      {activePage === "Blogs" && <BlogsSection />}

      {/* Analytics page */}
      {activePage === "Analytics" && <div>Analytics Section</div>}

      {/* Chat page */}
      {activePage === "Chat" && <div>Chat Section</div>}

      {/* Settings page */}
      {activePage === "Settings" && <div>Settings Section</div>}
    </div>
  );
};

export default DashboardContent;
