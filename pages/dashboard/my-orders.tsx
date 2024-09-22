/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

// Define the type for an order
interface Order {
  _id: string;
  productName: string;
  status: string;
}

const MyOrders = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session) {
        setError("You need to be logged in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/api/orders/my-orders");
        const fetchedOrders = response.data.orders as Order[];
        if (fetchedOrders.length === 0) {
          setError("No orders found.");
        } else {
          setOrders(fetchedOrders);
        }
      } catch (error) {
        const message =
          (error as any)?.response?.data?.message || "Failed to fetch orders.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>My Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            {order.productName} - {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
