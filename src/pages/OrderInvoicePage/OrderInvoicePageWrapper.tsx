// src/pages/OrderInvoicePage/OrderInvoicePageWrapper.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUsersWithOrders } from "../../types/server/orderApi";
import OrderInvoicePage from "./OrderInvoicePage";
import type { UserOrders, Order } from "../../types/server/orderApi";

const OrderInvoicePageWrapper: React.FC = () => {
  const { userId, orderId } = useParams<{ userId: string; orderId: string }>();
  const [user, setUser] = useState<UserOrders | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsersWithOrders().then((users) => {
      const foundUser = users.find((u) => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
        const foundOrder = foundUser.orders.find((o) => o.id === orderId);
        setOrder(foundOrder || null);
      }
      setLoading(false);
    });
  }, [userId, orderId]);

  if (loading) return <p>Loading...</p>;
  if (!user || !order) return <p>Order not found</p>;

  return <OrderInvoicePage user={user} order={order} />;
};

export default OrderInvoicePageWrapper;
