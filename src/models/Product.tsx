import mongoose, { Schema, Document } from "mongoose";

// Define the Review interface
export interface IReview {
  user: mongoose.Schema.Types.ObjectId; // Reference to the user ID
  comment: string;
  rating: number;
}

// Define the Product interface
export interface IProduct extends Document {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  description: string;
  reviews: IReview[];

  quantity: number;
}

// Review schema
const ReviewSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User reference
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

// Product schema
const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [ReviewSchema],
  },
  { timestamps: true }
);

// Export the Product model
export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
