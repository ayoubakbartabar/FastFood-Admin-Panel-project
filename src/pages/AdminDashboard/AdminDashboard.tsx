import React, { useState } from "react";
import DashboardAside from "./AdminDashboardCom/DashboardAside/DashboardAside";
import DashboardNavBar from "./AdminDashboardCom/DashboardNavBar/DashboardNavBar";
import DashboardContent from "./AdminDashboardCom/DashboardContent/DashboardContent";
import "./AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      <DashboardAside
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`dashboard-main ${collapsed ? "collapsed" : ""} ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <DashboardNavBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <DashboardContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
