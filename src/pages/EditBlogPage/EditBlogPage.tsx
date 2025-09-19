import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, FieldArray, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

import { getBlogById, updateBlog } from "../../types/server/blogsApi";
import type { Blog } from "../../types/server/blogsApi";

import { FaTrash, FaParagraph, FaImages } from "react-icons/fa";
import { MdOutlineSubtitles } from "react-icons/md";

const EditBlogPage: React.FC = () => {
  const { id: blogId } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (!blogId) return;

    const fetchBlog = async () => {
      setLoading(true);
      const data = await getBlogById(blogId);
      if (data) setBlog(data);
      setLoading(false);
    };

    fetchBlog();
  }, [blogId]);

  const handlerSubmit = async (values: Blog) => {
    if (!blogId) return;
    try {
      await updateBlog(values);
      alert("Blog updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to update blog:", error);
      alert("Failed to update blog.");
    }
  };

  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>No blog found.</p>;

  return (
    <div className="new-blog-page">
      <h1 className="form-title">Edit Blog</h1>

      <Formik enableReinitialize initialValues={blog} onSubmit={handlerSubmit}>
        {({
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          isSubmitting,
        }) => (
          <Form className="blog-form">
            {/* Blog Image */}
            <div>
              {values.image && (
                <img
                  src={values.image}
                  alt="Preview"
                  className="preview-image"
                />
              )}
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () =>
                      setFieldValue("image", reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <ErrorMessage name="image" component="div" className="error" />
            </div>

            {/* Title */}
            <div>
              <input
                name="title"
                placeholder="Title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            {/* Categories */}
            <div>
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

            {/* Tags */}
            <div>
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                value={values.tags.join(", ")}
                onChange={(e) =>
                  setFieldValue(
                    "tags",
                    e.target.value.split(",").map((t) => t.trim())
                  )
                }
                onBlur={handleBlur}
              />
            </div>

            {/* Content Blocks */}
            <h3 className="input-title">Content:</h3>
            <FieldArray name="content">
              {({ push, remove }) => (
                <div>
                  {values.content.map((block, idx) => (
                    <div key={idx} className="content-block">
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

                      {(block.type === "paragraph" ||
                        block.type === "title") && (
                        <textarea
                          className="textarea-input"
                          name={`content[${idx}].text`}
                          placeholder={`Content ${idx + 1}`}
                          value={block.text}
                          onChange={(e) => {
                            handleChange(e);
                            e.target.style.height = "auto";
                            e.target.style.height = `${
                              e.target.scrollHeight + 6
                            }px`;
                          }}
                          onBlur={handleBlur}
                        />
                      )}

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

                      <button
                        type="button"
                        className="action-btn"
                        onClick={() => remove(idx)}
                      >
                        <FaTrash /> Remove
                      </button>
                    </div>
                  ))}

                  <div className="add-buttons">
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => push({ type: "paragraph", text: "" })}
                    >
                      <FaParagraph /> Add Paragraph
                    </button>
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => push({ type: "title", text: "" })}
                    >
                      <MdOutlineSubtitles /> Add Title
                    </button>
                    <button
                      type="button"
                      className="action-btn"
                      onClick={() => push({ type: "image", text: "" })}
                    >
                      <FaImages /> Add Image
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>

            <button
              type="submit"
              disabled={isSubmitting}
              className="action-btn"
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditBlogPage;
