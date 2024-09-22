import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
  category: string;
  image: string;
}

const EditProduct = () => {
  const [product, setProduct] = useState<Product>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    category: "",
    image: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!router.isReady || !id) return;

    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/admin/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [router.isReady, id]);

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Updating product with data: ", product);

    try {
      const updatedProduct = {
        ...product,
        price: Number(product.price),
        stock: Number(product.stock),
      };

      const response = await axios.put(
        `/api/admin/products/${id}`,
        updatedProduct
      );
      console.log("Update response: ", response.data);

      if (response.data) {
        setProduct(response.data);
      }
      setSuccessMessage("Product updated successfully!");
      setError(null);
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      setError("Failed to update product");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      {successMessage && (
        <div className="text-green-500 mb-4">{successMessage}</div>
      )}{" "}
      {error && <div className="text-red-500 mb-4">{error}</div>}{" "}
      <form onSubmit={handleUpdateProduct} className="space-y-4">
        <div>
          <label className="block">Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Price ($):</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Stock:</label>
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <div>
          <label className="block">Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
