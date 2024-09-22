import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../../src/models/Product";
import connectDB from "../../../../src/utils/connectDB";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  const { id } = req.query;

  const product = await Product.findById(id).populate("reviews.user");

  res.status(200).json(product);
}
