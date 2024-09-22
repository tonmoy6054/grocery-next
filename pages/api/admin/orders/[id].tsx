/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextApiRequest, NextApiResponse } from "next";
import Order from "src/models/Orders";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const order = await Order.findById(id);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      const { status } = req.body;

      order.status = status;
      await order.save();

      return res.status(200).json(order);
    } catch (error: any) {
      console.error("Error updating order:", error);
      return res
        .status(500)
        .json({ message: "Error updating order", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
