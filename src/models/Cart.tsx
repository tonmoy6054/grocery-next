import mongoose, { Schema, Document } from "mongoose";

interface CartItem {
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface CartDocument extends Document {
  user: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
  totalPrice: number;
}

const cartItemSchema = new Schema<CartItem>({
  product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema = new Schema<CartDocument>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
});

// Check if the model already exists to avoid OverwriteModelError
export default mongoose.models.Cart ||
  mongoose.model<CartDocument>("Cart", cartSchema);
