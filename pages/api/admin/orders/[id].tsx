import { NextApiRequest, NextApiResponse } from "next";

const orders = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "PUT") {
    const order = orders.find((order) => order.id === parseInt(id as string));

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const { status } = req.body;
    order.status = status;

    return res.status(200).json(order);
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
