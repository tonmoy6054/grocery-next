/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import withAdminAuth from "src/utils/withAdminAuth";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data.orders);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load orders");
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "/api/orders/updateStatus",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order status updated");
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Admin Orders</h2>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Order ID</th>
            <th className="px-4 py-2">Products</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">
                {order.products.map((product: any) => product.name).join(", ")}
              </td>
              <td className="border px-4 py-2">{order.totalPrice} Taka</td>
              <td className="border px-4 py-2">{order.status}</td>
              <td className="border px-4 py-2">
                {order.status === "pending" && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "delivered")}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Mark as Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default withAdminAuth(AdminOrders);
