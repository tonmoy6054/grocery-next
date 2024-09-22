import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../src/models/Product";
import connectDB from "../../../src/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method === "POST") {
    const { user, comment, rating } = req.body;
    const { id } = req.query;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.reviews.push({ user, comment, rating });
    await product.save();

    return res.status(201).json({ message: "Review added" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
