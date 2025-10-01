import React from "react";
import { NavLink } from "react-router-dom";
import "./DashboardAside.css";
import AsideLogo from "/images/661caca505c900f7a61a73ce_logo (1).png";

import { GoHomeFill } from "react-icons/go";
import { MdOutlineRestaurantMenu, MdFastfood } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { IoAnalyticsOutline, IoChatbubbleEllipses, IoSettings } from "react-icons/io5";

interface DashboardAsideProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardAside: React.FC<DashboardAsideProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const menuItems = [
    { id: 1, title: "Dashboard", icon: <GoHomeFill />, path: "/" },
    { id: 2, title: "Menu", icon: <MdOutlineRestaurantMenu />, path: "/menu" },
    { id: 3, title: "Orders", icon: <MdFastfood />, path: "/orders" },
    { id: 4, title: "Blogs", icon: <FaBook />, path: "/blogs" },
    { id: 5, title: "Analytics", icon: <IoAnalyticsOutline />, path: "/analytics" },
    { id: 6, title: "Chat", icon: <IoChatbubbleEllipses />, path: "/chat" },
    { id: 7, title: "Settings", icon: <IoSettings />, path: "/setting" },
  ];

  return (
    <aside className={`dashboard-aside ${collapsed ? "collapsed" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
      <img src={AsideLogo} alt="Logo" className="aside-logo" />
      <ul className="aside-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) => `aside-menu-btn ${isActive ? "active" : ""}`}
              onClick={() => mobileOpen && setMobileOpen(false)}
            >
              {item.icon}
              {!collapsed && <span className="menu-title">{item.title}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardAside;
