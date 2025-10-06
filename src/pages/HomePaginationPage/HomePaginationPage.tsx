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

const HomePaginationPage: React.FC = () => {
  const [initialValues, setInitialValues] = useState<{
    items: HomePaginationProp[];
  }>({ items: [] });
  const [loading, setLoading] = useState(true);

  // Fetch initial data from API when component mounts
  useEffect(() => {
    const getData = async () => {
      const result = await fetchHomePaginationData();
      if (result) {
        // Ensure all fields are strings to avoid uncontrolled input warning
        const sanitized = result.map((item) => ({
          id: item.id,
          header: item.header || "",
          title: item.title || "",
          description: item.description || "",
          image: item.image || "",
        }));
        setInitialValues({ items: sanitized });
      }
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
      const maxExistingId = Math.max(
        ...initialValues.items.map((i) => i.id),
        0
      );

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
        {({ values, isSubmitting }) => (
          <Form>
            <FieldArray name="items">
              {({ push, remove }) => (
                <div>
                  {values.items.map((item, idx) => (
                    <div key={item.id} className="form-array-item">
                      <h4>Item {idx + 1}</h4>

                      {/* Header */}
                      <div className="form-group">
                        <label>Header:</label>
                        <Field
                          name={`items[${idx}].header`}
                          value={item.header || ""}
                        />
                        <ErrorMessage
                          name={`items[${idx}].header`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Title */}
                      <div className="form-group">
                        <label>Title:</label>
                        <Field
                          name={`items[${idx}].title`}
                          value={item.title || ""}
                        />
                        <ErrorMessage
                          name={`items[${idx}].title`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Description */}
                      <div className="form-group">
                        <label>Description:</label>
                        <Field
                          as="textarea"
                          name={`items[${idx}].description`}
                          value={item.description || ""}
                        />
                        <ErrorMessage
                          name={`items[${idx}].description`}
                          component="div"
                          className="error"
                        />
                      </div>

                      {/* Image */}
                      <div className="form-group">
                        <label>Image:</label>
                        <Field
                          type="text"
                          name={`items[${idx}].image`}
                          value={item.image || ""}
                          placeholder="https://example.com/image.jpg"
                        />
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

                      {/* Remove button */}
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

                  {/* Add new item */}
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

            {/* Submit button */}
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
