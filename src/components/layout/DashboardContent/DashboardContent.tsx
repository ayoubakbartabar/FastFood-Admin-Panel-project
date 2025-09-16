import React, { useEffect, useState, useCallback } from "react";
import { getProducts } from "../../../types/server/productApi";
import type { Product as ApiProduct } from "../../../types/server/productApi";

import ProductCartSection from "../ProductCartSection/ProductCartSection";
import type { Product } from "../ProductCartSection/ProductCartSection";

import MenuSection from "../../../pages/AdminDashboard/AdminDashboardCom/MenuSection/MenuSection"; // example
import "./DashboardContent.css";
import BlogsSection from "../../../pages/AdminDashboard/AdminDashboardCom/BlogsSection/BlogsSection";

// Define props
interface DashboardContentProps {
  activePage: string;
}

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products only once (for Orders page for example)
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

  useEffect(() => {
    if (activePage === "Menu") {
      fetchProducts();
    }
  }, [activePage, fetchProducts]);

  return (
    <div className="dashboard-content">
      {/* Example sections */}
      {activePage === "Dashboard" && (
        <h1>Welcome to FastFood TNC Admin Panel</h1>
      )}

      {activePage === "Menu" && (
        <ProductCartSection products={products} loading={loading} />
      )}

      {activePage === "Orders" && <MenuSection />}

      {activePage === "Blogs" && <BlogsSection/>}
      {activePage === "Analytics" && <div>Analytics Section</div>}
      {activePage === "Chat" && <div>Chat Section</div>}
      {activePage === "Settings" && <div>Settings Section</div>}
    </div>
  );
};

export default DashboardContent;
