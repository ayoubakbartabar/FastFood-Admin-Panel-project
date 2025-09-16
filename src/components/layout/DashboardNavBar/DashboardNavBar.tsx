import React, { useState } from "react";
import "./DashboardNavBar.css";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

interface DashboardNavBarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardNavBar: React.FC<DashboardNavBarProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="dashboard-navbar">
      {/* Hamburger for mobile */}
      <button
        className="navbar-hamburger"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <FaBars />
      </button>

      {/* Search input with icon */}
      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input type="text" placeholder="Search..." className="navbar-search" />
      </div>

      {/* Notification icon */}
      <button className="navbar-bell">
        <FaBell />
      </button>

      {/* User dropdown */}
      <div className="navbar-user">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="user-btn"
        >
          <FaUserCircle />
        </button>
        {dropdownOpen && (
          <div className="user-dropdown">
            <a href="#">Profile</a>
            <a href="#">Logout</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DashboardNavBar;
