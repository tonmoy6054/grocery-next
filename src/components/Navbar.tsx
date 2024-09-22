// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "@/redux/store";

// import { FaShoppingCart } from "react-icons/fa";
// import Link from "next/link";

// import { useTheme } from "next-themes";
// import { toast } from "react-toastify";
// import { logout } from "../../src/features/userSlice";
// import { toggleTheme } from "../../src/features/themeSlice";

// const Navbar: React.FC = () => {
//   const dispatch = useDispatch();
//   const { isLoggedIn, userInfo } = useSelector(
//     (state: RootState) => state.user
//   );

//   const cart = useSelector((state: RootState) => state.cart);
//   const cartItemCount = cart.items.reduce(
//     (count, item) => count + item.quantity,
//     0
//   );

//   const { theme, setTheme } = useTheme();

//   const handleLogout = () => {
//     dispatch(logout());
//     toast.success("Logged out successfully");
//   };

//   const handleToggleTheme = () => {
//     dispatch(toggleTheme());
//     setTheme(theme === "light" ? "dark" : "light");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link
//           href="/"
//           className="flex items-center space-x-2 text-white text-3xl font-extrabold tracking-wide"
//         >
//           <span>Grocery</span>
//           <span className="text-yellow-400">Marketplace</span>
//         </Link>

//         <div className="hidden md:flex items-center space-x-8">
//           {/* User Greeting and Authentication */}
//           {isLoggedIn ? (
//             <div className="flex items-center space-x-6">
//               <span className="text-white font-semibold text-lg">
//                 Hi, {userInfo?.name}
//               </span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition duration-300"
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <Link
//               href="/login"
//               className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-5 py-2 rounded-lg shadow-lg transition duration-300"
//             >
//               Login/Register
//             </Link>
//           )}

//           <Link href="/checkout">
//             <FaShoppingCart className="text-white text-3xl hover:text-yellow-400 transition duration-300" />
//             <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
//               Cart ({cartItemCount})
//             </span>
//           </Link>

//           <button
//             onClick={handleToggleTheme}
//             className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-5 py-2 rounded-lg shadow-lg transition duration-300"
//           >
//             {theme === "light" ? "Dark" : "Light"} Mode
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "next-themes";
import { toast } from "react-toastify";
import { logout } from "../../src/features/userSlice";
import { toggleTheme } from "../../src/features/themeSlice";

const Navbar: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userInfo } = useSelector(
    (state: RootState) => state.user
  );

  const cart = useSelector((state: RootState) => state.cart);
  const cartItemCount = cart.items.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center space-x-2 text-white text-3xl font-extrabold tracking-wide"
        >
          <span>Grocery</span>
          <span className="text-yellow-400">Marketplace</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Full menu for desktop, hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
          {/* User Greeting and Authentication */}
          {isLoggedIn ? (
            <div className="flex items-center space-x-6">
              <span className="text-white font-semibold text-lg">
                Hi, {userInfo?.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-5 py-2 rounded-lg shadow-lg transition duration-300"
            >
              Login/Register
            </Link>
          )}

          <Link href="/checkout" className="relative">
            <FaShoppingCart className="text-white text-3xl hover:text-yellow-400 transition duration-300" />
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
              {cartItemCount}
            </span>
          </Link>

          <button
            onClick={handleToggleTheme}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-5 py-2 rounded-lg shadow-lg transition duration-300"
          >
            {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>

      {/* Mobile menu, visible when hamburger icon is clicked */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center space-y-4 bg-gray-700 p-4">
            {isLoggedIn ? (
              <div className="flex flex-col items-center space-y-4">
                <span className="text-white font-semibold text-lg">
                  Hi, {userInfo?.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg px-5 py-2 rounded-lg shadow-lg transition duration-300"
              >
                Login/Register
              </Link>
            )}

            <Link href="/checkout" className="relative">
              <FaShoppingCart className="text-white text-3xl hover:text-yellow-400 transition duration-300" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            </Link>

            <button
              onClick={handleToggleTheme}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-5 py-2 rounded-lg shadow-lg transition duration-300"
            >
              {theme === "light" ? "Dark" : "Light"} Mode
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
