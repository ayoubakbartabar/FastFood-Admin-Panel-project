import React, { useEffect, useState } from "react";
import ProductCartSection from "../../components/layout/ProductCartSection/ProductCartSection";
import type { Product } from "../../types/server/productApi";
import { getProducts } from "../../types/server/productApi";

const MenuPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await getProducts();

        // Map to ensure SKU is defined
        const mappedProducts: Product[] = data.map((p) => ({
          ...p,
          sku: p.sku ?? "N/A",
        }));

        // Optional: simulate loading delay
        setTimeout(() => {
          setProducts(mappedProducts);
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return <ProductCartSection products={products} loading={loading} />;
};

export default MenuPage;
