import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { UserOrders, Order } from "../../../../types/server/orderApi";
import "./OrderInvoicePage.css";

interface OrderInvoicePageProps {
  user: UserOrders;
  order: Order;
}

const OrderInvoicePage: React.FC<OrderInvoicePageProps> = ({ user, order }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: ref,
    documentTitle: `Invoice_${order.id}`,
  });

  return (
    <div className="invoice-page">
      <div className="invoice-container" ref={ref}>
        <h1>Invoice</h1>
        <p>
          <b>Customer:</b> {user.name}
        </p>
        <p>
          <b>Order ID:</b> {order.id}
        </p>
        <p>
          <b>Date:</b> {new Date(order.date).toLocaleString()}
        </p>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    className="invoice-table-image"
                    src={item.image}
                    alt={item.title}
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price} $</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="invoice-total">
          <p>Subtotal: {order.subtotal} $</p>
          <p>Total: {order.total} $</p>
        </div>
        <button className="print-btn" onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
};

export default OrderInvoicePage;
