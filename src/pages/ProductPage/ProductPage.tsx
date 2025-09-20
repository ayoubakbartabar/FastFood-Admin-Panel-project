import React, { memo, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import { updateProduct, API_BASE_URL } from "../../types/server/productApi";
import type { Product } from "../../types/server/productApi";

import "./ProductPage.css";

// Validation Schema
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

// Main Component
const ProductPage: React.FC = memo(() => {
  // Get product data from router location
  const location = useLocation();
  const product: Product | undefined = location.state?.product;

  const navigate = useNavigate();
  // State for image preview
  const [preview, setPreview] = useState<string | null>(
    product?.image
      ? product.image.startsWith("http")
        ? product.image
        : `${API_BASE_URL}${product.image}`
      : null
  );

  // Show message if product not found
  if (!product)
    return <div className="product-page__not-found">Product not found.</div>;

  // Handle form submit to update product
  const handleUpdate = useCallback(async (values: Product) => {
    try {
      if (!values.id) {
        alert("Product ID is missing!");
        return;
      }
      const result = await updateProduct(values);
      if (result) alert("Product updated successfully!");
      else alert("Failed to update product.");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
    navigate("/");
  }, []);

  return (
    <div className="product-page-elem">
      <h1 className="product-page-elem__title">Edit Product</h1>

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
          <Form className="product-page-elem__form">
            {/* Image Upload */}
            <div className="product-page-elem__form-group product-page-elem__image-upload">
              <label className="product-page-elem__label">Product Image:</label>

              <div className="product-page-elem__image-box">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="product-page-elem__preview-img"
                    />
                    <button
                      type="button"
                      className="product-page-elem__remove-btn"
                      onClick={() => {
                        setPreview(null);
                        setFieldValue("image", "");
                      }}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <label className="product-page-elem__upload-btn">
                    Upload Image
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
                            setPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                )}
              </div>

              <ErrorMessage
                name="image"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* Title */}
            <div className="product-page-elem__form-group">
              <label className="product-page-elem__label">
                Title:
                <Field
                  type="text"
                  name="title"
                  className="product-page-elem__input"
                />
              </label>
              <ErrorMessage
                name="title"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* Price */}
            <div className="product-page-elem__form-group">
              <label className="product-page-elem__label">
                Price:
                <Field
                  type="number"
                  name="price"
                  step="0.01"
                  className="product-page-elem__input"
                />
              </label>
              <ErrorMessage
                name="price"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* Category */}
            <div className="product-page-elem__form-group">
              <label className="product-page-elem__label">
                Category:
                <Field
                  type="text"
                  name="category"
                  className="product-page-elem__input"
                />
              </label>
              <ErrorMessage
                name="category"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* SKU */}
            <div className="product-page-elem__form-group">
              <label className="product-page-elem__label">
                SKU:
                <Field
                  type="text"
                  name="sku"
                  className="product-page-elem__input"
                />
              </label>
              <ErrorMessage
                name="sku"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* Stock Count */}
            <div className="product-page-elem__form-group">
              <label className="product-page-elem__label">
                Stock Count:
                <Field
                  type="number"
                  name="count"
                  step="1"
                  className="product-page-elem__input"
                />
              </label>
              <ErrorMessage
                name="count"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* Star Rating */}
            <div className="product-page-elem__form-group">
              <label className="product-page-elem__label">
                Star Rating (0-5):
                <Field
                  type="number"
                  name="star"
                  min={0}
                  max={5}
                  step="0.01"
                  className="product-page-elem__input"
                />
              </label>
              <ErrorMessage
                name="star"
                component="div"
                className="product-page-elem__error"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="product-page-elem__btn"
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
