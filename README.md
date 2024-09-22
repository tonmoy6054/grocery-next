Grocery Marketplace
The Grocery Marketplace is a modern e-commerce platform focused on providing an intuitive, responsive, and seamless shopping experience for grocery enthusiasts. The application allows users to explore various grocery products, add items to the cart, and place orders with ease. Administrators can manage products and orders efficiently via a dashboard.

Features
Responsive Design: Seamless browsing across devices with a fully responsive UI.

Dark & Light Mode: Users can toggle between dark and light themes using the integrated theme switcher.
User Authentication: Login and registration system using JWT-based authentication.

Redux Persist: Cart data is persisted across sessions, ensuring users don’t lose their cart data after a page reload.

Product Management (Admin): Add, edit, delete products, and manage orders via the admin dashboard.
Order Management: Users can view their order history, and admins can update order status.
Cart Functionality: Add, remove, and view items in the cart with an updated badge on the navbar.

Project Structure
bash
Copy code
├── public # Public assets (images, fonts, etc.)
├── src
│ ├── components # Reusable UI components
│ ├── features # Redux slices for state management
│ ├── pages # Next.js pages for routing
│ ├── redux # Redux store configuration
│ ├── styles # Global CSS or Tailwind CSS configuration
├── .env.local # Environment variables
├── package.json # Project dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # Project documentation

Installation & Setup
Prerequisites
Node.js (v14.x or higher)
MongoDB
Steps
Clone the repository:

bash

git clone https://github.com/tonmoy6054/grocery-next
cd grocery-marketplace
Install dependencies:

bash

npm install
Set up environment variables:

Create a .env.local file in the root directory and add the following variables:

env

MONGO_URI=mongodb+srv://grocery-marketplace:tonmoy40805460@cluster0.n8dm2vh.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=samibaski@A
Run the development server:

bash

npm run dev
The project will run on http://localhost:3000.

Features Breakdown
UI/UX Enhancements
Improved user interface with intuitive navigation.
Responsive design with seamless user experience across all devices.
User Authentication
Secure registration and login system using JWT-based authentication.
Optionally supports access token and refresh token-based login system.

Product Management
Admin dashboard allows adding, editing, and deleting products.
Admin can manage orders and update their status.

Cart and Checkout
Add products to the cart from both product listing and detail pages.
Persist the cart using Redux Persist across sessions.
Checkout with a pre-selected payment method (Cash on Delivery).
Order management for both users and admins.

Dark/Light Mode
Implemented using the Next.js Themes package.
Users can toggle between dark and light themes.
Pages Overview

Home Page (/)
Landing page with navigation and featured grocery products.
Login/Register Page (/login, /register)
Allows users to create accounts or log in to their existing ones.

Product Pages
/fish, /vegetables, /meat, etc., dynamically render product lists.
Product detail pages allow users to add products to the cart and review items.

Checkout Page (/checkout)
View cart items and proceed with a "Cash On Delivery" payment method.
Create an order with a pending status and receive a confirmation toast.

Admin Dashboard
/dashboard/products: View and manage products.
/dashboard/orders: View and update order statuses.
/dashboard/products/add-product: Add new products to the platform.

Create a .env.local file in the root directory and add the following variables:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Run the development server:

Error Handling
Next.js's error handling features are utilized to provide informative error messages and graceful fallbacks for a robust user experience.

Dependencies
React: Frontend UI library.
Next.js: Framework for server-side rendering and static site generation.

Tailwind CSS: Utility-first CSS framework for styling.
Redux & Redux Persist: For state management and session persistence.
React Toastify: For toast notifications.
Next-Themes: For dark and light mode implementation.

JWT & bcryptjs: For user authentication and password encryption.

Future Improvements
Implement product reviews using server actions.
Add payment gateway integration for a more robust checkout experience.
Implement real-time order tracking for users.
