import React from "react";

import { useNavigate } from "react-router-dom";

import "./SettingPage.css";

function SettingPage() {
  
  const navigate = useNavigate();

  return (
    <div className="setting-section">
      <button className="navbar-btn" onClick={() => navigate("/navbar-page")}>
        <span className="circle1"></span>
        <span className="circle2"></span>
        <span className="circle3"></span>
        <span className="circle4"></span>
        <span className="circle5"></span>
        <span className="text">NavBar</span>
      </button>

      <button className="footer-btn" onClick={() => navigate("/footer-page")}>
        <span className="circle1"></span>
        <span className="circle2"></span>
        <span className="circle3"></span>
        <span className="circle4"></span>
        <span className="circle5"></span>
        <span className="text">Footer</span>
      </button>
    </div>
  );
}

export default SettingPage;
