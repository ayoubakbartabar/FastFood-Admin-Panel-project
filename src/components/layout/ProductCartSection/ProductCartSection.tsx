import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../../types/server/productApi";
import type { Product } from "../../../types/server/productApi";
import "./ProductCartSection.css";
import AddBlogCard from "../../../pages/BlogPage/BlogPageCom/AddBlogCard/AddBlogCard";

// Props for single product card
interface ProductCardProps {
  product: Product;
}

// Individual Product Card Component
const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit-product-page/${product.id}`, { state: { product } });
  };

  const imageSrc = product.image.startsWith("http")
    ? product.image
    : `${API_BASE_URL}${product.image}`;

  return (
    <div className="product-cart-section-card" onClick={handleClick}>
      <div className="product-cart-section-card-image-wrapper">
        <img
          src={imageSrc}
          alt={product.title}
          loading="lazy"
          className="product-cart-section-card-image"
        />
      </div>

      <div className="product-cart-section-card-details">
        <h3 className="product-cart-section-card-title">{product.title}</h3>
        <p className="product-cart-section-card-price">
          ${product.price.toFixed(2)}
        </p>
        <p className="product-cart-section-card-category">{product.category}</p>
        <p className="product-cart-section-card-stock">
          Stock: {product.count}
        </p>
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
const ProductCartSection: React.FC<ProductCartSectionProps> = memo(
  ({ products, loading = false }) => {
    // Loading skeletons
    if (loading) {
      return (
        <div className="product-cart-section-container">
          <div className="product-cart-section-grid">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="product-cart-section-card product-cart-section-card-skeleton"
              >
                <div className="product-cart-section-card-image-wrapper" />
                <div className="product-cart-section-card-details">
                  <div className="product-cart-section-skeleton-line product-cart-section-skeleton-line-short" />
                  <div className="product-cart-section-skeleton-line" />
                  <div className="product-cart-section-skeleton-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // No products fallback
    if (!products || products.length === 0) {
      return (
        <div className="product-cart-section-container">
          <div className="product-cart-section-no-products">
            No products available
          </div>
        </div>
      );
    }

    // Render Product Grid
    return (
      <div className="product-cart-section-container">
        <h2 className="product-cart-section-title">Products</h2>
        <div className="product-cart-section-grid">
          {/* Add new product card */}
          <AddBlogCard to="/new-product" />

          {/* Render each product card */}
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
);

export default ProductCartSection;
