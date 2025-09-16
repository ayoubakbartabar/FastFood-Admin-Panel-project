import React, { useState } from "react";
import DashboardAside from "../../components/layout/DashboardAside/DashboardAside";
import DashboardNavBar from "../../components/layout/DashboardNavBar/DashboardNavBar";
import DashboardContent from "../../components/layout/DashboardContent/DashboardContent";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  // Sidebar collapse state
  const [collapsed, setCollapsed] = useState(false);

  // Sidebar mobile open state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track active page/section
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <DashboardAside
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setActivePage={setActivePage}
      />

      <div
        className={`dashboard-main ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        {/* Navbar */}
        <DashboardNavBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        {/* Dynamic content */}
        <DashboardContent activePage={activePage} /> 
      </div>
    </div>
  );
};

export default AdminDashboard;
