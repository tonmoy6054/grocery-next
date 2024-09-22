/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/utils/connectDB";
import Order from "../../../src/models/Orders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const orders = await Order.find({});
      res.status(200).json(orders);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to fetch orders", error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { customerName, productName, status } = req.body;

      const newOrder = new Order({ customerName, productName, status });
      await newOrder.save();

      res.status(201).json(newOrder);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to create order", error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { orderId } = req.query;
      const { status } = req.body;

      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(updatedOrder);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to update order", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
