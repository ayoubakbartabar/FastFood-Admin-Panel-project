import React, { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, FieldArray, ErrorMessage, Field } from "formik";
import * as Yup from "yup";

import { createBlog } from "../../../../types/server/blogsApi";
import type { Blog } from "../../../../types/server/blogsApi";
import type { FormikHelpers } from "formik";

import { FaTrash, FaParagraph, FaImages } from "react-icons/fa";
import { MdOutlineSubtitles } from "react-icons/md";

import "./NewBlogPage.css";

// Validation Schema
const BlogSchema = Yup.object().shape({
  image: Yup.string().required("Image is required"),
  title: Yup.string().required("Title is required"),
  categories: Yup.string().required("Category is required"),
  tags: Yup.string(),
  content: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string().oneOf(["paragraph", "title", "image"]).required(),
        text: Yup.string().required("Content cannot be empty"),
      })
    )
    .min(1, "At least one content block is required"),
});

// Main Component
const NewBlogSection: React.FC = () => {
  const navigate = useNavigate();
  const [filedValue, setFieldValue] = useState<string | null>(null);

  // Initial form values
  const initialValues = {
    image: "",
    title: "",
    categories: "",
    tags: "",
    content: [{ type: "paragraph", text: "" }],
  };

  // Form submit handler
  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const blogData: Omit<Blog, "id" | "createdAt"> = {
      ...values,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      content: values.content.map((block) => ({
        type: block.type as "paragraph" | "title" | "image",
        text: block.text,
      })),
    };

    try {
      const newBlog = await createBlog(blogData);
      alert(newBlog ? "Blog created successfully!" : "Failed to create blog");
      resetForm();
      navigate("/");
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("An error occurred while saving the blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="new-blog-page">
      <h1 className="form-title">Add New Blog</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={BlogSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          isSubmitting,
          isValid,
          handleChange,
          handleBlur,
          setFieldValue,
        }) => (
          <Form className="blog-form">
            {/* Image Upload Section*/}
            <div className="image-upload-container">
              {values.image ? (
                // Image Preview with Remove button
                <div className="image-preview-wrapper">
                  <img
                    src={values.image as string}
                    alt="Preview"
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => setFieldValue("image", "")}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                // Custom Upload Button
                <label className="custom-file-upload">
                  <Field
                    type="text"
                    name="image"
                    placeholder="https://example.com/image.jpg"
                    className="new-product-input"
                  />
                </label>
              )}
              <ErrorMessage name="image" component="div" className="error" />
            </div>

            {/* Title Input*/}
            <div className="input-group">
              <input
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            {/* Category Input*/}
            <div className="input-group">
              <input
                name="categories"
                placeholder="Category"
                value={values.categories}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage
                name="categories"
                component="div"
                className="error"
              />
            </div>

            {/* Tags Input*/}
            <div className="input-group">
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={values.tags}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {/* Content Blocks Section*/}
            <h3 className="input-title">Content:</h3>
            <FieldArray name="content">
              {({ push, remove }) => (
                <div>
                  {values.content.map((block, idx) => (
                    <div key={idx} className="content-block">
                      {/* Select block type */}
                      <select
                        name={`content[${idx}].type`}
                        value={block.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="paragraph">Paragraph</option>
                        <option value="title">Title</option>
                        <option value="image">Image</option>
                      </select>

                      {/* Textarea for paragraph/title */}
                      {(block.type === "paragraph" ||
                        block.type === "title") && (
                        <textarea
                          className="textarea-input"
                          name={`content[${idx}].text`}
                          placeholder={`Content ${idx + 1}`}
                          value={block.text}
                          onChange={(e) => {
                            handleChange(e);
                            // Auto resize textarea
                            e.target.style.height = "auto";
                            e.target.style.height = `${
                              e.target.scrollHeight + 6
                            }px`;
                          }}
                          onBlur={handleBlur}
                        />
                      )}

                      {/* Input for image URL */}
                      {block.type === "image" && (
                        <input
                          name={`content[${idx}].text`}
                          placeholder="Image URL"
                          value={block.text}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      )}

                      <ErrorMessage
                        name={`content[${idx}].text`}
                        component="div"
                        className="error"
                      />

                      {/* Remove content block button */}
                      <button
                        className="action-btn"
                        type="button"
                        onClick={() => remove(idx)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  ))}

                  {/* Buttons to add content blocks */}
                  <div className="add-buttons">
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => push({ type: "paragraph", text: "" })}
                    >
                      <FaParagraph /> Add Paragraph
                    </button>
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => push({ type: "title", text: "" })}
                    >
                      <MdOutlineSubtitles /> Add Title
                    </button>
                    <button
                      className="action-btn"
                      type="button"
                      onClick={() => push({ type: "image", text: "" })}
                    >
                      <FaImages /> Add Image
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className="action-btn submit-btn"
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewBlogSection;
