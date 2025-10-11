import React, { memo, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../../types/server/productApi";
import type { Product } from "../../../types/server/productApi";

import "./ProductCartSection.css";

import AddBlogCard from "../../../pages/BlogPage/BlogPageCom/AddBlogCard/AddBlogCard";

// Single Product Card Component
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/edit-product-page/${product.id}`, { state: { product } });
  };

  const imageSrc = product.image.startsWith("http")
    ? product.image
    : `${API_BASE_URL}${product.image}`;

  return (
    <div className="product-cart-section-card">
      <div className="product-cart-section-card-image-wrapper" onClick={handleClick}>
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

// Main ProductCartSection Component
interface ProductCartSectionProps {
  products: Product[];
  loading?: boolean;
}

const ProductCartSection: React.FC<ProductCartSectionProps> = memo(
  ({ products, loading = false }) => {
    // Local states
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const itemsPerPage = 3;

    // Ref for IntersectionObserver
    const loaderRef = useRef<HTMLDivElement | null>(null);

    // Load initial products
    useEffect(() => {
      setVisibleProducts(products.slice(0, itemsPerPage));
      setPage(1);
    }, [products]);

    // Load next batch of products
    useEffect(() => {
      if (page === 1) return;

      setIsLoadingMore(true);

      // Simulate network delay
      setTimeout(() => {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const nextProducts = products.slice(start, end);

        if (nextProducts.length > 0) {
          setVisibleProducts((prev) => [...prev, ...nextProducts]);
        }
        setIsLoadingMore(false);
      }, 2500);
    }, [page, products]);

    // IntersectionObserver to detect scroll near bottom
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first.isIntersecting && !isLoadingMore) {
            const totalLoaded = page * itemsPerPage;
            if (totalLoaded < products.length) {
              setPage((prev) => prev + 1);
            }
          }
        },
        {
          root: null,
          rootMargin: "200px",
          threshold: 0.1,
        }
      );

      const currentLoader = loaderRef.current;
      if (currentLoader) observer.observe(currentLoader);

      return () => {
        if (currentLoader) observer.unobserve(currentLoader);
      };
    }, [page, products.length, isLoadingMore]);

    // Initial loading skeleton
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

    // Render Product Grid with Infinite Scroll
    return (
      <div className="product-cart-section-container">
        <h2 className="product-cart-section-title">Products</h2>

        <div className="product-cart-section-grid">
          {/* Add new product card */}
          <AddBlogCard to="/new-product" />

          {/* Render visible products */}
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Loader at the bottom */}
        <div ref={loaderRef} className="product-cart-section-loader">
          {isLoadingMore && (
            <div className="loading-spinner"></div>
          )}
        </div>
      </div>
    );
  }
);

export default ProductCartSection;
