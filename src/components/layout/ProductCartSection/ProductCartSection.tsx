import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCartSection.css";

// Product type definition
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  count: number;
  sku?: string;
}

// Props for single product card
interface ProductCardProps {
  product: Product;
}

// Individual Product Card Component
// Memoized for performance optimization
const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const navigate = useNavigate();

  // Navigate to product detail page on click
  const handleClick = () => {
    navigate("/ProductPage", { state: { product } });
  };

  return (
    <div
      className="product-card"
      onClick={handleClick}
    >
      <div className="product-image-wrapper">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="product-card-image"
        />
      </div>
      <div className="product-details">
        <h3>{product.title}</h3>
      </div>
    </div>
  );
});

// Props for main product cart section
interface ProductCartSectionProps {
  products: Product[];
  loading?: boolean;
}

// Main ProductCartSection Component
// Memoized for performance
const ProductCartSection: React.FC<ProductCartSectionProps> = memo(
  ({ products, loading = false }) => {
    // Loading state with Skeleton Loader
    if (loading) {
      return (
        <div className="products-grid">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="product-card skeleton">
              <div className="product-image-wrapper" />
              <div className="product-details">
                <div className="skeleton-line short" />
                <div className="skeleton-line" />
                <div className="skeleton-line" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    // No products fallback
    if (!products || products.length === 0) {
      return <div className="no-products">No products available</div>;
    }

    // Render Product Grid
    return (
      <div className="product-card-section">
        <h2>Products</h2>
        <div className="products-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    );
  }
);

export default ProductCartSection;
