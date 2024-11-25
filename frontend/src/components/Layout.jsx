import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  ShoppingBagIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isSeller, isCustomer } = useAuth();

  const navigation = [
    
    ...(isSeller
      ? [
        { name: "Dashboard", href: "/", icon: HomeIcon },
        { name: "Add Product", href: "/add-product", icon: PlusIcon },
          { name: "Seller Products", href: "/my-products", icon: ShoppingCartIcon },
          
          { name: "Seller Orders", href: "/orders", icon: ShoppingBagIcon },
        ]
      : []),
    ...(isCustomer
      ? [
        { name: "Home", href: "/", icon: HomeIcon },
          { name: "Products", href: "/products", icon: ShoppingCartIcon },
          { name: "Orders", href: "/orders", icon: ShoppingBagIcon },
        ]
      : []),
      { name: "Shipments", href: "/shipments", icon: TruckIcon },
    { name: "Ask Query", href: "/querymanagement", icon: ChatBubbleLeftRightIcon },
    { name: "Settings", href: "/settings", icon: CogIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-lightGrey">
      {/* Header */}
      <header className="bg-darkGrey shadow-md sticky top-0 z-50 px-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex justify-between items-center h-16">
          <Link to="/" className="text-yellow text-2xl font-bold">
            XportConnect
          </Link>
          <button
            type="button"
            className="lg:hidden text-lightGrey hover:bg-greyHover hover:text-yellowHover p-2 rounded"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/settings">
              <UserCircleIcon className="h-8 w-8 text-yellow cursor-pointer" />
            </Link>
          </div>
        </div>
      </header>

      {/* Sidebar for Small Screens */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-40 flex">
          {/* Sidebar */}
          <div className="bg-white w-64 p-4 space-y-4 shadow-xl transform transition-transform duration-300">
            {/* Close Button */}
            <button
              type="button"
              className="text-gray-600 hover:text-yellowHover p-2 rounded self-end"
              onClick={() => setIsSidebarOpen(false)} // Close sidebar on click
            >
              <XMarkIcon className="h-6 w-6" />
            </button>

            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar when a menu item is clicked
                className={`${
                  item.href === location.pathname
                    ? "bg-yellow text-darkGrey"
                    : "text-darkGrey hover:bg-lightGrey hover:text-yellowHover"
                } flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all`}
              >
                <item.icon
                  className={`${
                    item.href === location.pathname
                      ? "text-darkGrey"
                      : "text-gray-400"
                  } mr-3 h-6 w-6`}
                />
                {item.name}
              </Link>
            ))}
          </div>

          {/* Overlay */}
          <div
            className="flex-1 bg-black bg-opacity-50"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar when clicking outside it
          />
        </div>
      )}

      {/* Main Content */}
      <div className="lg:flex lg:gap-6 py-6 px-4 sm:px-6 lg:px-8 flex-1">
        {/* Sidebar for Large Screens */}
        <nav className="hidden lg:block lg:w-64 xl:w-72 bg-white rounded-lg shadow-lg p-4 space-y-4 overflow-y-auto sticky top-16 h-[calc(100vh-7rem)]">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                item.href === location.pathname
                  ? "bg-yellow text-darkGrey"
                  : "text-darkGrey hover:bg-lightGrey hover:text-yellowHover"
              } flex items-center px-4 py-3 rounded-md text-sm font-medium transition-all`}
            >
              <item.icon
                className={`${
                  item.href === location.pathname ? "text-darkGrey" : "text-gray-400"
                } mr-3 h-6 w-6`}
              />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow-lg p-6 overflow-y-auto h-[calc(100vh-7rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
