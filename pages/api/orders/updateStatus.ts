// pages/api/orders/updateStatus.ts

import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Order from "src/models/Orders"; // Import your Order model

// Utility function to verify JWT token and check for admin role
const verifyAdmin = (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new Error("No token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
  const user = decoded as { role: string };

  if (user.role !== "admin") {
    throw new Error("Not authorized");
  }

  return user;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      verifyAdmin(req);

      const { orderId, status } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });
      }

      order.status = status;
      await order.save();

      return res.status(200).json({
        success: true,
        message: "Order status updated successfully",
        order,
      });
    } catch (error) {
      return res.status(403).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
