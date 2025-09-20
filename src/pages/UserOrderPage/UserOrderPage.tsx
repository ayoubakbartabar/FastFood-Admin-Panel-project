import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllUsersWithOrders } from "../../types/server/orderApi";
import type { UserOrders, Order } from "../../types/server/orderApi";

import "./UserOrderPage.css";

function UserOrderPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserOrders | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsersWithOrders()
      .then((data) => {
        const foundUser = data.find((u) => u.id === id);
        setUser(foundUser || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading orders...</p>;
  if (!user) return <p>No orders found</p>;

  return (
    <div className="orders-container">
      {user.orders.map((order: Order) => (
        <div key={order.id} className="order-box">
          <h3>Order ID: {order.id}</h3>
          <p>Subtotal: ${order.subtotal}</p>
          <p>Total: ${order.total}</p>
          <p>Date: {new Date(order.date).toLocaleString()}</p>

          <h4>Items:</h4>
          <ul className="order-items">
            {order.items.map((item) => (
              <li key={item.id}>
                <img src={item.image} alt={item.title} />
                {item.title} x {item.quantity} (${item.price})
              </li>
            ))}
          </ul>

          <Link to={`/orders/${user.id}/${order.id}`}>
            <button className="print-btn">Print Invoice</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserOrderPage;
