import React from "react";
import OrderSection from "./OrderPageCom/OrderSection/OrderSection";

const OrderPage: React.FC = () => {
  return (
    <div style={{padding:"1rem"}} className="order-page">
      <h1>Orders Page</h1>
      <OrderSection />
    </div>
  );
};

export default OrderPage;
