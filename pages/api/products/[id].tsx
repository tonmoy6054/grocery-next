import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../src/utils/connectDB";
import Product from "../../../src/models/Product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    // Connect to the database
    await connectDB();

    // Find the product by its ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Send back the product data
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
}
