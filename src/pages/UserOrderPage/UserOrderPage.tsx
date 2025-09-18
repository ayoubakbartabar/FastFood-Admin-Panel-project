import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAllUsersWithOrders } from "../../types/server/orderApi";
import type { Order, UserOrders } from "../../types/server/orderApi";

import "./UserOrderPage.css";

function UserOrderPage() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserOrders | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch all users who have at least one order
    getAllUsersWithOrders()
      .then((data) => {
        const foundUser = data.find(
          (user: UserOrders) => user.id.toString() === id
        );
        setUser(foundUser || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch orders:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading orders...</p>;

  if (!user) return <p>No orders found</p>;
  return (
    // <div>UserOrderPage</div>
    <div>
      {user?.orders.map((order: Order) => (
        <div key={user.id} style={{ marginBottom: 30 }}>
          {user.orders.map((order: Order) => (
            <div
              key={order.id}
              style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}
            >
              <h4>Order ID: {order.id}</h4>
              <p>Subtotal: ${order.subtotal}</p>
              <p>Total: ${order.total}</p>
              <p>Date: {new Date(order.date).toLocaleString()}</p>
              <h5>Items:</h5>
              <ul>
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <img src={item.image} alt={item.title} width={50} />
                    <span>
                      {item.title} x {item.quantity} (${item.price})
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserOrderPage;
