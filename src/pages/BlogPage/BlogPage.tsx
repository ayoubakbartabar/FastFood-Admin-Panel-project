import React from "react";
import BlogsSection from "../../pages/BlogsSection/BlogsSection";

const BlogPage: React.FC = () => {
  return (
    <div style={{padding:"1rem"}} className="blog-page">
      <h1>Blogs Page</h1>
      <BlogsSection />
    </div>
  );
};

export default BlogPage;
