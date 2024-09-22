import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  category,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <Link href={`/products/${category}/${id}`} passHref>
        <div className="cursor-pointer">
          <Image
            src={image || "/default-image.jpg"}
            alt={name}
            width={200}
            height={200}
            className="object-cover"
          />
          <h2 className="text-xl font-semibold">{name}</h2>
          <h2 className="text-xl font-semibold">{category}</h2>
          <p className="text-lg">Price: ${price}</p>
        </div>
      </Link>
      <button className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
