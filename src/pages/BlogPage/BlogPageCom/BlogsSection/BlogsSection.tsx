import React, { useEffect, useState, useMemo, useRef } from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { Link } from "react-router-dom";

import { getBlogs } from "../../../../types/server/blogsApi";
import type { Blog } from "../../../../types/server/blogsApi";
import AddBlogCard from "../AddBlogCard/AddBlogCard";

import "./BlogsSection.css";

// Extended Blog type with firstParagraph
interface BlogWithParagraph extends Blog {
  firstParagraph?: string;
}

const BlogsSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleBlogs, setVisibleBlogs] = useState<BlogWithParagraph[]>([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 3;

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Fetch blogs
  useEffect(() => {
    const fetchData = async () => {
      const data = await getBlogs();
      setBlogs(data);
    };
    fetchData();

    // Skeleton loader for initial load
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Compute first paragraph
  const blogsWithFirstParagraph = useMemo(() => {
    return blogs.map((blog) => {
      const firstParagraph = blog.content.find(
        (block) => block.type === "paragraph"
      )?.text;
      return { ...blog, firstParagraph };
    });
  }, [blogs]);

  // Load initial blogs
  useEffect(() => {
    setVisibleBlogs(blogsWithFirstParagraph.slice(0, itemsPerPage));
    setPage(1);
  }, [blogsWithFirstParagraph]);

  // Load more blogs on page change
  useEffect(() => {
    if (page === 1) return;

    setLoadingMore(true);

    // Simulate network delay
    setTimeout(() => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const nextBlogs = blogsWithFirstParagraph.slice(start, end);

      if (nextBlogs.length > 0) {
        setVisibleBlogs((prev) => [...prev, ...nextBlogs]);
      }
      setLoadingMore(false);
    }, 5000);
  }, [page, blogsWithFirstParagraph]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loadingMore) {
          const totalLoaded = page * itemsPerPage;
          if (totalLoaded < blogsWithFirstParagraph.length) {
            setPage((prev) => prev + 1);
          }
        }
      },
      { root: null, rootMargin: "200px", threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [page, loadingMore, blogsWithFirstParagraph.length]);

  const skeletonCards = Array.from({ length: itemsPerPage });

  return (
    <div className="home-page-blog-grid">
      {/* Add new blog card */}
      <AddBlogCard to="/new-blog" />

      {/* Initial loading skeleton */}
      {loading &&
        skeletonCards.map((_, idx) => (
          <div key={idx} className="skeleton-card">
            <div className="skeleton-image"></div>
            <div className="skeleton-content">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line medium"></div>
              <div className="skeleton-line long"></div>
            </div>
          </div>
        ))}

      {/* Render visible blogs */}
      {!loading &&
        visibleBlogs.map((blog, idx) => (
          <div
            key={blog.id}
            className="blog-card"
            style={{ animationDelay: `${0.1 * idx}s` }}
          >
            <img src={blog.image} alt={blog.title} className="blog-image" />
            <div className="blog-content">
              <span className="blog-category">{blog.categories}</span>
              <h3 className="blog-title">{blog.title}</h3>
              {blog.firstParagraph && (
                <p className="blog-paragraph">{blog.firstParagraph}</p>
              )}
              <Link to={`/edit-blog/${blog.id}`} className="edit-blog">
                Edit Blog <MdOutlineArrowRightAlt className="arrow" />
              </Link>
            </div>
          </div>
        ))}

      {/* Loader for infinite scroll */}
      <div ref={loaderRef} className="blog-loader">
        {loadingMore && <div className="loading-spinner"></div>}
        {!loadingMore &&
          !loading &&
          visibleBlogs.length >= blogsWithFirstParagraph.length && (
            <p className="loading-text">No more blogs</p>
          )}
      </div>
    </div>
  );
};

export default BlogsSection;
