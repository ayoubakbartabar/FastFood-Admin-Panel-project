import React, { memo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import type { Product } from "../../types/server/productApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProduct, API_BASE_URL } from "../../types/server/productApi";
import "./ProductPage.css";

/**
 * Yup validation schema for the product form
 */
const ProductSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .min(0, "Price must be >= 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  sku: Yup.string(),
  count: Yup.number()
    .min(0, "Stock count must be >= 0")
    .required("Stock count required"),
  star: Yup.number()
    .min(0, "Star rating must be at least 0")
    .max(5, "Star rating cannot exceed 5")
    .required("Star rating is required"),
});

/**
 * ProductPage component for editing a product
 */
const ProductPage: React.FC = memo(() => {
  // Get product data passed via location state
  const location = useLocation();
  const product: Product | undefined = location.state?.product;

  // If no product found, show a message
  if (!product) return <div>Product not found.</div>;

  /**
   * Memoized submit handler
   * Sends updated product data to the API
   */
  const handleUpdate = useCallback(async (values: Product) => {
    try {
      if (!values.id) {
        alert("Product ID is missing!");
        return;
      }

      // Send the product object directly to API
      console.log("Sending to API:", values);

      const result = await updateProduct(values);

      if (result) {
        alert("Product updated successfully!");
        console.log("Updated product:", result);
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  }, []);

  return (
    <div className="product-page">
      <h1>Edit Product</h1>

      {/* Display product image */}
      <img
        src={
          product.image.startsWith("http")
            ? product.image
            : `${API_BASE_URL}${product.image}`
        }
        alt={product.title}
        className="product-image-preview"
      />

      {/* Formik form for product editing */}
      <Formik
        initialValues={{ ...product }}
        validationSchema={ProductSchema}
        onSubmit={handleUpdate}
        enableReinitialize // Reinitialize form if product changes
      >
        {({ isSubmitting }) => (
          <Form className="product-form">
            {/* Title input */}
            <label>
              Title:
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </label>

            {/* Price input */}
            <label>
              Price:
              <Field type="number" name="price" step="0.01" />
              <ErrorMessage name="price" component="div" className="error" />
            </label>

            {/* Category input */}
            <label>
              Category:
              <Field type="text" name="category" />
              <ErrorMessage name="category" component="div" className="error" />
            </label>

            {/* SKU input */}
            <label>
              SKU:
              <Field type="text" name="sku" />
              <ErrorMessage name="sku" component="div" className="error" />
            </label>

            {/* Stock count input */}
            <label>
              Stock Count:
              <Field type="number" name="count" step="1" />
              <ErrorMessage name="count" component="div" className="error" />
            </label>

            {/* Star rating input */}
            <label>
              Star Rating (0-5):
              <Field type="number" name="star" min={0} max={5} step="0.01" />
              <ErrorMessage name="star" component="div" className="error" />
            </label>

            {/* Submit button */}
            <button
              className="update-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});

export default ProductPage;
