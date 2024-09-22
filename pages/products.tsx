import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IProduct } from "../src/models/Product";
import Link from "next/link";
import Image from "next/image";
import { addToCart } from "../src/features/cartSlice";
import { RootState } from "../src/redux/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsPage = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(6);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "" || product.category === categoryFilter;
    const matchesSearchTerm = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleAddToCart = (product: IProduct) => {
    try {
      dispatch(addToCart(product));
      toast.success("Product added successfully to the cart", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error("Failed to add the product to the cart", {
        position: "bottom-left",
        autoClose: 5000,
      });
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        Products
      </h1>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search Products"
          className="border rounded-l p-2 w-1/3"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border rounded-r p-2"
          onChange={(e) => setCategoryFilter(e.target.value)}
          defaultValue=""
        >
          <option value="">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Milk">Milk</option>
          <option value="Rice">Rice</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <div
              key={product._id}
              className="border border-gray-200 bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="rounded mb-4"
                placeholder="blur"
                blurDataURL="/loading-image-placeholder.png"
              />
              <h2 className="text-xl font-semibold text-green-600">
                {product.name}
              </h2>
              <p className="text-gray-700 mt-2">
                Price: <span className="font-bold">${product.price}</span>
              </p>
              <p className="text-gray-700">
                Category:{" "}
                <span className="font-semibold">{product.category}</span>
              </p>
              <p className="text-gray-500 text-sm mt-2">
                {product.description}
              </p>

              <button
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>

              <Link
                href={`/products/${product._id}`}
                className="block mt-4 text-blue-500 underline hover:text-blue-600"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products available
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="mx-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-2 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="mx-2 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Cart Items Count */}
      <div className="fixed top-4 right-4">
        <span className="bg-red-500 text-white rounded-full px-4 py-2">
          Cart Items:{" "}
          {cartItems.reduce((total, item) => total + (item.quantity || 0), 0)}
        </span>
      </div>
    </div>
  );
};

export default ProductsPage;
