"use client";

import PriceDisplay from "@/utils/PriceDisplay";
import React from "react";
import { useCartStore } from "@/store/useCartStore";

const RazorpayButton = ({ amount = 500 }) => {
 const { cartItems, clearCart } = useCartStore(); // Make sure you have a clearCart method

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      const options = {
        key: "rzp_test_baqU988B0393JS", // replace with your Razorpay test key
        amount: amount * 100, // amount in paise
        currency: "INR",
        name: "Flipzon",
        description: "Test Order Payment",
        image: "/logo.png",
        handler: function (response: { razorpay_payment_id: string }) {
          alert("Payment Successful");
          alert("Payment ID: " + response.razorpay_payment_id);
          clearCart(); // Clear the cart after successful payment
        },
        prefill: {
          name: "Sandeep Patil",
          email: "test@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Flipzon HQ",
        },
        theme: {
          color: "#f97316", // Tailwind orange-500
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    };

    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };

    document.body.appendChild(script);
  };

  return (
    <button
      onClick={loadRazorpay}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
    >
      Pay <PriceDisplay amount={amount} />
    </button>
  );
};

export default RazorpayButton;
