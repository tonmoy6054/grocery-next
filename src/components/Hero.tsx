import Link from "next/link";
import { useEffect, useState } from "react";

const Hero = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative bg-gray-100 h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center transition-transform duration-500 ease-out"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/6152382/pexels-photo-6152382.jpeg?auto=compress&cs=tinysrgb&w=600")',
          transform: `translateY(${scrollPosition * 0.5}px)`,
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black via-green-900 to-transparent opacity-70"></div>

      <div className="relative container mx-auto text-center px-4 py-24">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white mb-4 animate-fadeInDown">
          Quality Groceries Delivered Fresh!
        </h2>
        <p className="text-lg sm:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fadeInUp">
          Discover the freshest products and enjoy the convenience of home
          delivery with just a few clicks.
        </p>

        <Link href="/products">
          <button className="relative inline-block px-10 py-4 bg-green-600 hover:bg-green-500 text-lg sm:text-xl text-white font-semibold rounded-full shadow-xl transform hover:scale-105 transition-all duration-300 ease-out animate-bounce">
            Shop Now
          </button>
        </Link>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-8 w-72 sm:w-96 md:w-[30rem] lg:w-[35rem]"></div>
    </div>
  );
};

export default Hero;
