import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../src/utils/connectDB";
import Product from "../../../src/models/Product";
import mongoose from "mongoose";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  console.log("ID received in API:", id); // Debug log

  await dbConnect();

  if (req.method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ message: "Server error", error });
    }
  } else if (req.method === "PUT") {
    try {
      console.log("Request body for update:", req.body);

      if (typeof req.body.price === "string") {
        req.body.price = Number(req.body.price);
      }
      if (typeof req.body.stock === "string") {
        req.body.stock = Number(req.body.stock);
      }
      console.log("Request body for update:", req.body);

      const updatedProductData = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        description: req.body.description,
        category: req.body.category,
        image: req.body.image,
      };

      console.log("Updating product with data:", updatedProductData);

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updatedProductData },
        { new: true, runValidators: true }
      );
      console.log("Updated product from DB:", updatedProduct);

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Update error:", error);
      if (error instanceof mongoose.Error.ValidationError) {
        return res
          .status(400)
          .json({ message: "Validation error", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update product", error });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).end();
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "Failed to delete product", error });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
