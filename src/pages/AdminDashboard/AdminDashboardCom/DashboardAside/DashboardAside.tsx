import React, { useMemo } from "react";
import "./DashboardAside.css";
import AsideLogo from "/images/661caca505c900f7a61a73ce_logo (1).png";
import { GoHomeFill } from "react-icons/go";
import {
  MdOutlineRestaurantMenu,
  MdFastfood,
  MdOutlinePeopleAlt,
} from "react-icons/md";
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
}

const DashboardAside: React.FC<DashboardAsideProps> = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  // Memoized menu items to prevent unnecessary re-renders
  const menuItems = useMemo(
    () => [
      { id: 1, title: "Dashboard", icon: <GoHomeFill /> },
      { id: 2, title: "Menu", icon: <MdOutlineRestaurantMenu /> },
      { id: 3, title: "Orders", icon: <MdFastfood /> },
      { id: 4, title: "Customers", icon: <MdOutlinePeopleAlt /> },
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
                // Collapse sidebar when Dashboard button clicked
                if (item.title === "Dashboard") setCollapsed(!collapsed);
                // Close mobile sidebar on item click
                if (mobileOpen) setMobileOpen(false);
              }}
            >
              {item.icon}
              {!collapsed && <span className="menu-title">{item.title}</span>}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default DashboardAside;
