/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import Cart from "../../../src/models/Cart"; // Adjust the path according to your project structure
import Product from "../../../src/models/Product";
import { getSession } from "next-auth/react"; // Assuming you're using next-auth

// API handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await addToCart(req, res);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Cart logic (addToCart function)
const addToCart = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { productId, quantity } = req.body;

    // Validate input
    if (!productId || !quantity) {
      return res
        .status(400)
        .json({ message: "Product ID and quantity are required" });
    }

    // Get the session to obtain the user ID
    const session = await getSession({ req });
    if (!session) {
      return res
        .status(401)
        .json({ message: "You must be logged in to add to cart" });
    }
    const userId = session.user?.id; // Replace with actual user field from session

    // Find product by ID
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Ensure the product has a price field
    if (!product.price) {
      return res.status(400).json({ message: "Product price not available" });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [], totalPrice: 0 });
    }

    // Update the cart items
    const existingItemIndex = cart.items.findIndex(
      (item: any) => item.product.toString() === productId
    );
    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    // Recalculate total price
    cart.totalPrice = cart.items.reduce((total: number, item: any) => {
      const itemProduct =
        item.product.toString() === productId ? product : null;
      if (itemProduct) {
        return total + itemProduct.price * item.quantity;
      }
      return total;
    }, 0);

    await cart.save();
    return res.status(200).json({ message: "Product added to cart", cart });
  } catch (error: any) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error adding product to cart", error: error.message });
  }
};
