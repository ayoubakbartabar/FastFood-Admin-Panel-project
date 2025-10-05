import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

import {
  fetchHomePaginationData,
  createHomePaginationData,
  deleteHomePaginationData,
} from "../../types/server/homePaginationApi";
import type { HomePaginationProp } from "../../types/server/homePaginationApi";

import "./HomePaginationPage.css";

// Yup validation schema for each pagination item
const HomePaginationSchema = Yup.object().shape({
  header: Yup.string().required("Header is required"),
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.string().required("Image is required"),
});

// Helper function to convert uploaded file to Base64 string
const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const HomePaginationPage: React.FC = () => {
  // State for storing initial form values
  const [initialValues, setInitialValues] = useState<{
    items: HomePaginationProp[];
  }>({ items: [] });
  const [loading, setLoading] = useState(true);

  // Fetch initial data from API when component mounts
  useEffect(() => {
    const getData = async () => {
      const result = await fetchHomePaginationData();
      if (result) setInitialValues({ items: result });
      setLoading(false);
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!initialValues.items.length) return <div>No pagination data found</div>;

  // Handle form submission
  const handleSubmit = async (
    values: { items: HomePaginationProp[] },
    { setSubmitting }: any
  ) => {
    try {
      // Determine the maximum existing ID in the current data
      const maxExistingId = Math.max(
        ...initialValues.items.map((i) => i.id),
        0
      );

      // Only create new items with ID greater than existing max ID
      for (const item of values.items) {
        if (item.id > maxExistingId) {
          await createHomePaginationData(item);
        }
      }

      alert("Home Pagination updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update Home Pagination!");
    }
    setSubmitting(false);
  };

  return (
    <div className="home-pagination-page">
      <h2>Edit Home Pagination</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={Yup.object({
          items: Yup.array().of(HomePaginationSchema),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((item, idx) => (
                    <div key={item.id} className="form-array-item">
                      <h4>Item {idx + 1}</h4>

                      {/* Header input field */}
                      <div className="form-group">
                        <label>Header:</label>
                        <Field name={`items[${idx}].header`} />
                        <ErrorMessage
                          name={`items[${idx}].header`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Title input field */}
                      <div className="form-group">
                        <label>Title:</label>
                        <Field name={`items[${idx}].title`} />
                        <ErrorMessage
                          name={`items[${idx}].title`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Description textarea */}
                      <div className="form-group">
                        <label>Description:</label>
                        <Field
                          as="textarea"
                          name={`items[${idx}].description`}
                        />
                        <ErrorMessage
                          name={`items[${idx}].description`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Image upload input */}
                      <div className="form-group">
                        <label>Image:</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (
                              e.currentTarget.files &&
                              e.currentTarget.files[0]
                            ) {
                              const base64 = await fileToBase64(
                                e.currentTarget.files[0]
                              );
                              setFieldValue(`items[${idx}].image`, base64);
                            }
                          }}
                        />
                        {/* Show image preview if available */}
                        {item.image && (
                          <img
                            src={item.image}
                            alt="preview"
                            style={{ maxWidth: "200px", marginTop: "10px" }}
                          />
                        )}
                        <ErrorMessage
                          name={`items[${idx}].image`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Remove item button */}
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            if (
                              item.id <=
                              Math.max(...initialValues.items.map((i) => i.id))
                            ) {
                              await deleteHomePaginationData(Number(item.id));
                            }
                            remove(idx); 
                          } catch (err) {
                            console.error(err);
                            alert("Failed to delete item!");
                          }
                        }}
                      >
                        Remove Item
                      </button>
                    </div>
                  ))}

                  {/* Add new item button */}
                  <button
                    type="button"
                    onClick={() => {
                      const maxId = values.items.length
                        ? Math.max(...values.items.map((i) => i.id))
                        : 0;
                      push({
                        id: maxId + 1,
                        header: "",
                        title: "",
                        description: "",
                        image: "",
                      });
                    }}
                    style={{ backgroundColor: "green", marginBottom: "20px" }}
                  >
                    Add Item
                  </button>
                </div>
              )}
            </FieldArray>

            {/* Submit form button */}
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default HomePaginationPage;
