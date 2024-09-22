import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../src/redux/store";
import { clearCart } from "../../src/features/cartSlice";
import { toast } from "react-toastify";
import { persistStore } from "redux-persist";
import { store } from "../../src/redux/store";
import { useRouter } from "next/router";
// import { createOrder } from "pages/api/orders/createOrders";

const persistor = persistStore(store);

const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const deliveryCharge = 15;
  const router = useRouter();

  const items = (cart.items || []).map((product) => ({
    ...product,
    quantity: product.quantity || 1,
  }));

  const totalPrice =
    items.reduce((total, item) => total + item.price * item.quantity, 0) +
    deliveryCharge;

  const handleCheckout = async () => {
    const order = {
      products: items,
      totalPrice,
      paymentMethod: "Cash On Delivery",
      status: "pending",
    };

    try {
      await createOrder(order);
      toast.success("Order placed successfully", { position: "top-right" });
      dispatch(clearCart());
      persistor.purge();
      setIsOrderPlaced(true);
      router.push("/order-success");
    } catch (error) {
      toast.error("Failed to place order", { position: "top-right" });
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-green-600">
        Thank you for your order! Redirecting...
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Checkout
      </h2>

      {items.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          Your cart is empty. Add some products to proceed.
        </p>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border-b pb-4 mb-4"
              >
                <div className="space-y-1">
                  <p className="text-xl font-semibold text-gray-800">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Price: {item.price} Taka
                  </p>
                </div>
                <p className="text-lg font-medium text-gray-700">
                  Total: {item.price * item.quantity} Taka
                </p>
              </div>
            ))}

            <div className="border-t pt-6">
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <p>Delivery Charge</p>
                <p>{deliveryCharge} Taka</p>
              </div>
              <div className="flex justify-between text-2xl font-bold text-gray-800 mt-4">
                <p>Total Price</p>
                <p>{totalPrice} Taka</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-700">
                Payment Method
              </h3>
              <label className="inline-flex items-center mt-3">
                <input
                  type="radio"
                  value="Cash On Delivery"
                  checked
                  readOnly
                  className="form-radio h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-600">Cash On Delivery</span>
              </label>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300 ease-in-out mt-6"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
