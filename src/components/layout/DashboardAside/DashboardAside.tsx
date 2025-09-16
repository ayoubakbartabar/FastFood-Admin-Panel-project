import React, { useMemo } from "react";
import "./DashboardAside.css";
import AsideLogo from "/images/661caca505c900f7a61a73ce_logo (1).png";
import { GoHomeFill } from "react-icons/go";
import {
  MdOutlineRestaurantMenu,
  MdFastfood,
} from "react-icons/md";
import { FaBook } from "react-icons/fa";
import {
  IoAnalyticsOutline,
  IoChatbubbleEllipses,
  IoSettings,
} from "react-icons/io5";

interface DashboardAsideProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActivePage: React.Dispatch<React.SetStateAction<string>>; 
}

const DashboardAside: React.FC<DashboardAsideProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  setActivePage,
}) => {
  // Memoized menu items to prevent unnecessary re-renders
  const menuItems = useMemo(
    () => [
      { id: 1, title: "Dashboard", icon: <GoHomeFill /> },
      { id: 2, title: "Menu", icon: <MdOutlineRestaurantMenu /> },
      { id: 3, title: "Orders", icon: <MdFastfood /> },
      { id: 4, title: "Blogs", icon: <FaBook /> },
      { id: 5, title: "Analytics", icon: <IoAnalyticsOutline /> },
      { id: 6, title: "Chat", icon: <IoChatbubbleEllipses /> },
      { id: 7, title: "Settings", icon: <IoSettings /> },
    ],
    []
  );

  return (
    <aside
      className={`dashboard-aside ${collapsed ? "collapsed" : ""} ${
        mobileOpen ? "mobile-open" : ""
      }`}
    >
      {/* Sidebar logo */}
      <img src={AsideLogo} alt="Logo" className="aside-logo" />

      {/* Menu list */}
      <ul className="aside-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className="aside-menu-btn"
              onClick={() => {
                // Set active page in parent layout
                setActivePage(item.title);

                // Collapse sidebar only when Dashboard button is clicked
                if (item.title === "Dashboard") setCollapsed(!collapsed);

                // Close sidebar on mobile when any item is clicked
                if (mobileOpen) setMobileOpen(false);
              }}
            >
              {/* Icon */}
              {item.icon}

              {/* Show title only if sidebar is not collapsed */}
              {!collapsed && <span className="menu-title">{item.title}</span>}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardAside;
