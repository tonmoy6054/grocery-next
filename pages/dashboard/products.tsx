import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null); // State for storing error
  const router = useRouter();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/admin/products");
        setProducts(response.data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (productId: string) => {
    router.push(`/dashboard/products/edit/${productId}`);
  };

  const handleDelete = async (productId: string) => {
    try {
      await axios.delete(`/api/admin/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err: any) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product. Please try again later.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Product Management</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-4 py-2">Product Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">${product.price}</td>
              <td className="border px-4 py-2">{product.stock}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(product._id)}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2"
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
