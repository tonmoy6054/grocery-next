// /pages/api/orders/rate-order.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import connectDB from "../../../src/utils/connectDB"; // Database connection utility
import Order from "src/models/Orders"; // Import Order model

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { orderId, productId, rating } = req.body;

  try {
    // Find the order and update the product's rating
    const order = await Order.findOne({
      _id: orderId,
      userId: session.user.id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const product = order.products.find(
      (p) => p.productId.toString() === productId
    );

    if (!product || order.status !== "delivered") {
      return res.status(400).json({ message: "Cannot rate this product." });
    }

    product.rating = rating; // Assuming you have a rating field in the product schema
    await order.save();

    res.status(200).json({ message: "Rating submitted successfully." });
  } catch (error) {
    console.error("Error rating product:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
