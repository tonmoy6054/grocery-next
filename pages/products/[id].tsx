import { GetServerSideProps } from "next";
import axios from "axios";
import Image from "next/image";
import { IProduct } from "../../src/models/Product";
import { useDispatch } from "react-redux";
import { addToCart } from "../../src/features/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ProductDetailProps {
  product: IProduct | null;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const dispatch = useDispatch();

  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center text-red-600">
        <h2 className="text-4xl font-bold mb-4">Product not found</h2>
        <p className="text-lg text-gray-500">
          The product you are looking for might be unavailable.
        </p>
      </div>
    );
  }

  const handleAddToCart = (product: IProduct) => {
    try {
      dispatch(addToCart(product));
      toast.success("Product added to the cart", {
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

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">{product.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image Section */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded shadow-lg object-cover"
            placeholder="blur"
            blurDataURL="/loading-image-placeholder.png"
          />
        </div>

        {/* Product Details Section */}
        <div className="space-y-6">
          <p className="text-2xl font-semibold text-gray-700">
            Price: <span className="text-blue-600">${product.price}</span>
          </p>
          <p className="text-lg text-gray-600">
            Stock: <span className="font-medium">{product.stock} units</span>
          </p>
          <p className="text-lg text-gray-600">
            Category: <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-gray-600 text-base leading-relaxed mt-4">
            {product.description}
          </p>

          {/* Add to Cart Button */}
          <button
            className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-blue-300"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>

          {/* Product Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-semibold mb-4">Customer Reviews</h3>
              <ul className="space-y-6">
                {product.reviews.map((review, index) => (
                  <li key={index} className="border-b pb-6">
                    <p className="text-gray-800 font-semibold">
                      <span className="text-blue-600">Username:</span>{" "}
                      {review.user.username}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Comment:</span>{" "}
                      {review.comment}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Rating:</span>{" "}
                      {review.rating} / 5
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Fetch the product details on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const response = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );
    return {
      props: {
        product: response.data,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return {
      props: {
        product: null,
      },
    };
  }
};

export default ProductDetail;
