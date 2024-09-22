import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import Order from "src/models/Orders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const orders = await Order.find({ userId: session.user.id }); // Query by userId

      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: "No orders found." });
      }

      res.status(200).json({ orders });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
