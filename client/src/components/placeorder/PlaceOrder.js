import React, { useState } from "react";

const PlaceOrder = () => {
  // State to store order details (you can expand this as needed)
  const [orderDetails, setOrderDetails] = useState({
    product: null,
    quantity: null,
    price: null
  });

  // WhatsApp phone number (replace with the number you want orders sent to)
  const whatsappNumber = "9994442863"; // Example: +91xxxxxxxxxx

  // Function to create the WhatsApp message
  const createWhatsAppMessage = () => {
    const message = `Hello, I would like to place an order for the following product:\n\n
                      Product: ${orderDetails.product}\n
                      Quantity: ${orderDetails.quantity}\n
                      Price: ₹${orderDetails.price}\n
                      `;
    // URL-encode the message
    return encodeURIComponent(message);
  };

  return (
    <div>
      <p>Product: {orderDetails.product}</p>
      <p>Quantity: {orderDetails.quantity}</p>
      <p>Price: ₹{orderDetails.price}</p>

      <a
        href={`https://wa.me/${whatsappNumber}?text=${createWhatsAppMessage()}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-block",
          backgroundColor: "#25D366", // WhatsApp color
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Place Order
      </a>
    </div>
  );
};

export default PlaceOrder;
