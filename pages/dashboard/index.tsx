import React, { useContext } from "react";
import Link from "next/link";

const AuthContext = React.createContext<{ role: string }>({ role: "admin" });

const DashboardHomepage = () => {
  const { role } = useContext(AuthContext);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Welcome to Your Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {role === "admin" ? (
          <>
            {/* Admin Section */}
            <AdminDashboardLinks />
          </>
        ) : (
          <>
            {/* User Section */}
            <UserDashboardLinks />
          </>
        )}
      </div>
    </div>
  );
};

// Admin Links Component
const AdminDashboardLinks = () => (
  <>
    <DashboardCard
      title="Manage Products"
      description="View, edit, or delete existing grocery products."
      link="/dashboard/products"
      icon="📦"
    />
    <DashboardCard
      title="Add New Product"
      description="Easily add new products to the marketplace."
      link="/dashboard/products/add-products"
      icon="➕"
    />
    <DashboardCard
      title="Manage Orders"
      description="Handle customer orders and track delivery statuses."
      link="/dashboard/orders"
      icon="🛒"
    />
  </>
);

// User Links Component
const UserDashboardLinks = () => (
  <>
    <DashboardCard
      title="My Orders"
      description="Track your orders and view delivery statuses."
      link="/dashboard/my-orders"
      icon="📦"
    />
    <DashboardCard
      title="Rate Delivered Products"
      description="Provide ratings for products that have been delivered."
      link="/dashboard/my-orders"
      icon="⭐"
    />
  </>
);

// Reusable Dashboard Card Component
const DashboardCard = ({
  title,
  description,
  link,
  icon,
}: {
  title: string;
  description: string;
  link: string;
  icon: string;
}) => (
  <Link href={link}>
    <div className="bg-gradient-to-br from-green-100 to-green-300 rounded-lg shadow-lg p-6 cursor-pointer transform transition hover:scale-105">
      <div className="flex items-center space-x-4">
        <span className="text-4xl">{icon}</span>
        <div>
          <h2 className="text-xl font-semibold text-green-800">{title}</h2>
          <p className="text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);

export default DashboardHomepage;
