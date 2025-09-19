import React, { memo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import type { Product } from "../../types/server/productApi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateProduct, API_BASE_URL } from "../../types/server/productApi";
import "./ProductPage.css";

// Validation schema using Yup
const ProductSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .min(0, "Price must be >= 0")
    .required("Price is required"),
  category: Yup.string().required("Category is required"),
  sku: Yup.string(),
  count: Yup.number()
    .min(0, "Stock count must be >= 0")
    .required("Stock count is required"),
  star: Yup.number()
    .min(0, "Star rating must be at least 0")
    .max(5, "Star rating cannot exceed 5")
    .required("Star rating is required"),
});

const ProductPage: React.FC = memo(() => {
  // Get product data from router location state
  const location = useLocation();
  const product: Product | undefined = location.state?.product;

  // State for image preview (used when user uploads a new image)
  const [preview, setPreview] = useState<string | null>(
    product?.image
      ? product.image.startsWith("http")
        ? product.image
        : `${API_BASE_URL}${product.image}`
      : null
  );

  // If product data is missing, show fallback message
  if (!product) return <div>Product not found.</div>;

  // Submit handler for updating product
  const handleUpdate = useCallback(async (values: Product) => {
    try {
      if (!values.id) {
        alert("Product ID is missing!");
        return;
      }

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

      {/* Product image preview */}
      {preview && (
        <img
          src={preview}
          alt={product.title}
          className="product-image-preview"
        />
      )}

      {/* Formik form for product editing */}
      <Formik
        initialValues={{
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          category: product.category,
          sku: product.sku || "",
          count: product.count,
          star: product.star,
        }}
        validationSchema={ProductSchema}
        onSubmit={handleUpdate}
        enableReinitialize
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="product-form">
            {/* Image upload field */}
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFieldValue("image", reader.result as string);
                      setPreview(reader.result as string); // update preview
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <ErrorMessage name="image" component="div" className="error" />
            </label>

            {/* Title field */}
            <label>
              Title:
              <Field type="text" name="title" />
              <ErrorMessage name="title" component="div" className="error" />
            </label>

            {/* Price field */}
            <label>
              Price:
              <Field type="number" name="price" step="0.01" />
              <ErrorMessage name="price" component="div" className="error" />
            </label>

            {/* Category field */}
            <label>
              Category:
              <Field type="text" name="category" />
              <ErrorMessage name="category" component="div" className="error" />
            </label>

            {/* SKU field */}
            <label>
              SKU:
              <Field type="text" name="sku" />
              <ErrorMessage name="sku" component="div" className="error" />
            </label>

            {/* Stock count field */}
            <label>
              Stock Count:
              <Field type="number" name="count" step="1" />
              <ErrorMessage name="count" component="div" className="error" />
            </label>

            {/* Star rating field */}
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
