import React, { useEffect, useState, useMemo } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

import { getBlogs } from "../../types/server/blogsApi";
import type { Blog } from "../../types/server/blogsApi";

import "./BlogsSection.css";
import AddBlogCard from "./BlogSectionCom/AddBlogCard/AddBlogCard";

const BlogsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch blogs on mount
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    fetchData();

    // Show skeleton for 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Add first paragraph for preview
  const blogsWithFirstParagraph = useMemo(() => {
    return blogs.map((blog) => {
      const firstParagraph = blog.content.find(
        (block) => block.type === "paragraph"
      )?.text;
      return { ...blog, firstParagraph };
    });
  }, [blogs]);

  const skeletonCards = Array.from({ length: 4 });

  return (
    <div className="home-page-blog-grid">
      {/* Add new blog card */}
      <AddBlogCard to="new-blog"/>

      {/* Skeletons */}
      {loading
        ? skeletonCards.map((_, idx) => (
            <div key={idx} className="skeleton-card">
              <div className="skeleton-image"></div>
              <div className="skeleton-content">
                <div className="skeleton-line short"></div>
                <div className="skeleton-line medium"></div>
                <div className="skeleton-line long"></div>
              </div>
            </div>
          ))
        : blogsWithFirstParagraph.map((blog) => {
          console.log(blog.image);
          
            return (
              <div key={blog.id} className="blog-card">
                <img src={blog.image} alt={blog.title} className="blog-image" />
                <div className="blog-content">
                  <span className="blog-category">{blog.categories}</span>
                  <h3 className="blog-title">{blog.title}</h3>
                  {blog.firstParagraph && (
                    <p className="blog-paragraph">{blog.firstParagraph}</p>
                  )}

                  {/* Edit Blog */}
                  <Link to={`/edit-blog/${blog.id}`} className="edit-blog">
                    Edit Blog <MdOutlineArrowRightAlt className="arrow" />
                  </Link>
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default BlogsSection;
