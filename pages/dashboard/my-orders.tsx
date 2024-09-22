import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";

const MyOrders = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
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
        if (response.data.orders.length === 0) {
          setError("No orders found");
        } else {
          setOrders(response.data.orders);
        }
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch orders");
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
