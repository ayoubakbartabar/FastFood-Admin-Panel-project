import React from "react";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./AddBlogCart.css";

const AddBlogCard: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to new blog page on click
  const handleClick = () => {
    navigate("/new-blog");
  };

  return (
    <div className="blog-card add-blog-card" onClick={handleClick}>
      <div className="add-icon-wrapper">
        <MdAdd size={50} />
      </div>
    </div>
  );
};

export default AddBlogCard;
