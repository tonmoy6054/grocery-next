import React from "react";
import Link from "next/link";

const OrderSuccess: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          Thank you for your order!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
