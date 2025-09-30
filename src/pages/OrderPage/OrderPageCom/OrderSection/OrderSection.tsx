import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsersWithOrders } from "../../../../types/server/orderApi";
import type { UserOrders } from "../../../../types/server/orderApi";

import { FaUserTag } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";

import "./OrderSection.css";

const OrderSection: React.FC = () => {
  const [usersWithOrders, setUsersWithOrders] = useState<UserOrders[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsersWithOrders()
      .then((data) => {
        console.log("Fetched users with orders:", data); 
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
          onClick={() => navigate(`/user-order/${user.id}`)}
        >
          <div className="card-content">
            <div className="card-top">
              <span className="card-title">Orders for {user.name}</span>
            </div>
            <div className="card-bottom">
              <FaUserTag />
            </div>
          </div>
          <div className="card-image">
            <MdTableRestaurant />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderSection;
