import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic (e.g., API call)
    console.log("Subscribed with email:", email);
    setEmail(""); // Clear the input after submission
  };

  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-6 sm:space-y-0 sm:flex-row">
        {/* Footer Text */}
        <p className="text-sm text-gray-300 text-center">
          © 2024 Groceries Marketplace. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaFacebookF size={24} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaTwitter size={24} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaPinterest size={24} />
          </a>
        </div>

        <nav className="text-sm space-x-4 text-gray-300">
          <a href="/about" className="hover:text-white transition-colors">
            About Us
          </a>
          <a href="/contact" className="hover:text-white transition-colors">
            Contact
          </a>
          <a href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
        </nav>

        <form
          onSubmit={handleSubscription}
          className="flex items-center space-x-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Subscribe to our newsletter"
            className="px-4 py-2 rounded-l-md border border-gray-300 text-gray-800"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-r-md transition-colors"
          >
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
