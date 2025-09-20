import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllUsersWithOrders } from "../../types/server/orderApi";
import type { UserOrders } from "../../types/server/orderApi";

import { FaUserTag } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";

import "./OrderSection.css";

const OrderSection = () => {
  const [usersWithOrders, setUsersWithOrders] = useState<UserOrders[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users who have at least one order
    getAllUsersWithOrders()
      .then((data) => {
        setUsersWithOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (usersWithOrders.length === 0) return <p>No orders found</p>;

  return (
    <div className="order-section">
      {usersWithOrders.map((user) => (
        <div
          key={user.id}
          className="user-order-box-container"
          onClick={() => navigate(`./user-order/${user.id}`)}
        >
          {/* Card content area */}
          <div className="card-content">
            <div className="card-top">
              <span className="card-title">Orders for {user.name}</span>
            </div>
            <div className="card-bottom">
              <FaUserTag />
            </div>
          </div>

          {/* Icon in the background */}
          <div className="card-image">
            <MdTableRestaurant />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSection;
