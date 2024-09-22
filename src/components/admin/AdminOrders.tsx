import { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  status: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get("/api/admin/orders");
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (id: number, status: string) => {
    await axios.put(`/api/admin/orders/${id}`, { status });
    setOrders(
      orders.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>
                {order.status === "Pending" && (
                  <button
                    onClick={() => handleStatusChange(order.id, "Delivered")}
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

export default AdminOrders;
