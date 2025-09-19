import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API_BASE_URL, createProduct } from "../../types/server/productApi";
import "./NewProductPage.css";
import { useNavigate } from "react-router-dom";

// Yup validation schema for the product form
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
  image: Yup.string().required("Image URL is required"),
});

function NewProductPage() {
  const navigate = useNavigate();

  // Submit handler for creating a product
  const handleCreate = useCallback(async (values: any) => {
    try {
      console.log("Sending to API:", values);

      const result = await createProduct(values);

      if (result) {
        alert("Product created successfully!");
        console.log("Created product:", result);
      } else {
        alert("Failed to create product.");
      }
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred while creating the product.");
    }
  }, []);

  return (
    <div className="product-page">
      <h1>New Product</h1>

      {/* Formik form for product creation */}
      <Formik
        initialValues={{
          title: "",
          price: 0,
          category: "",
          sku: "",
          count: 0,
          star: 0,
          image: "",
        }}
        validationSchema={ProductSchema}
        onSubmit={handleCreate}
      >
        {({ values, isSubmitting }) => (
          <Form className="product-form">
            {/* Image preview */}
            {values.image && (
              <img
                src={
                  values.image.startsWith("http")
                    ? values.image
                    : `${API_BASE_URL}${values.image}`
                }
                alt="Preview"
                className="product-image-preview"
              />
            )}

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

            {/* Image URL input */}
            <label>
              Image URL:
              <Field type="text" name="image" />
              <ErrorMessage name="image" component="div" className="error" />
            </label>

            {/* Submit button */}
            <button
              className="update-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewProductPage;
