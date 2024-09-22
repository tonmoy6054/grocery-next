import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = { name, price, stock, description, category, image };

    await axios.post("/api/admin/products", newProduct);

    router.push("/dashboard/products");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Add New Product</h1>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <div>
          <label className="block">Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Price ($):</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
