import React, { useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { API_BASE_URL, createProduct } from "../../types/server/productApi";
import "./NewProductPage.css";
import { useNavigate } from "react-router-dom";

// Validation schema
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
  star: Yup.number().min(0).max(5).required("Star rating is required"),
  image: Yup.string().required("Image is required"),
});

const NewProductPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = useCallback(
    async (values: any) => {
      try {
        const result = await createProduct(values);
        if (result) {
          alert("Product created successfully!");
        } else {
          alert("Failed to create product.");
        }
        navigate("/");
      } catch (error) {
        console.error(error);
        alert("An error occurred while creating the product.");
      }
    },
    [navigate]
  );

  // Convert uploaded file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <div className="new-product-container">
      <h1 className="new-product-title">New Product</h1>

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
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="new-product-form">
            {/* Image upload and preview */}
            <div className="new-product-group">
              <label className="new-product-label">Product Image</label>
              <div className="new-product-image-wrapper">
                {values.image ? (
                  <>
                    <img
                      src={values.image}
                      alt="Preview"
                      className="new-product-preview"
                    />
                    <button
                      type="button"
                      className="new-product-remove-btn"
                      onClick={() => setFieldValue("image", "")}
                    >
                      Remove
                    </button>
                  </>
                ) : (
                  <label className="new-product-upload-btn">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const base64 = await fileToBase64(e.target.files[0]);
                          setFieldValue("image", base64);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* Title */}
            <div className="new-product-group">
              <label className="new-product-label">Title</label>
              <Field type="text" name="title" className="new-product-input" />
              <ErrorMessage
                name="title"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* Price */}
            <div className="new-product-group">
              <label className="new-product-label">Price</label>
              <Field
                type="number"
                step="0.01"
                name="price"
                className="new-product-input"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* Category */}
            <div className="new-product-group">
              <label className="new-product-label">Category</label>
              <Field
                type="text"
                name="category"
                className="new-product-input"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* SKU */}
            <div className="new-product-group">
              <label className="new-product-label">SKU</label>
              <Field type="text" name="sku" className="new-product-input" />
              <ErrorMessage
                name="sku"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* Stock Count */}
            <div className="new-product-group">
              <label className="new-product-label">Stock Count</label>
              <Field
                type="number"
                name="count"
                step="1"
                className="new-product-input"
              />
              <ErrorMessage
                name="count"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* Star */}
            <div className="new-product-group">
              <label className="new-product-label">Star Rating (0-5)</label>
              <Field
                type="number"
                min={0}
                max={5}
                step="0.01"
                name="star"
                className="new-product-input"
              />
              <ErrorMessage
                name="star"
                component="div"
                className="new-product-error"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="new-product-btn"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewProductPage;
