import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src/utils/connectDB";
import Product from "../../../src/models/Product";

const handleError = (
  res: NextApiResponse,
  statusCode: number,
  message: string,
  error: any = null
) => {
  res.status(statusCode).json({
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined,
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const {
      name,
      price,
      quantity,
      stock,
      image,
      category,
      description,
      reviews,
    } = req.body;
    console.log(req.body);

    if (
      !name ||
      !price ||
      !quantity ||
      !stock ||
      !image ||
      !category ||
      !description
    ) {
      return handleError(res, 400, "All fields are required");
    }

    try {
      // Create a new product
      const newProduct = new Product({
        name,
        price,
        quantity,
        stock,
        image,
        category,
        description,
        reviews: reviews || [],
      });
      await newProduct.save();

      return res.status(201).json({
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      return handleError(res, 500, "Failed to create product", error);
    }
  } else if (req.method === "GET") {
    try {
      // Fetch all products
      const products = await Product.find({});
      return res.status(200).json(products);
    } catch (error) {
      return handleError(res, 500, "Failed to fetch products", error);
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return handleError(res, 405, `Method ${req.method} Not Allowed`);
  }
}
