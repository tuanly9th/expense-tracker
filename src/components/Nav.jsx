import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold">
              Quản lý Chi tiêu
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/')}`}
              >
                Trang chủ
              </Link>

              <Link
                to="/transactions"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/transactions')}`}
              >
                Giao dịch
              </Link>

              <Link
                to="/categories"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/categories')}`}
              >
                Danh mục
              </Link>

              <Link
                to="/reports"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/reports')}`}
              >
                Báo cáo
              </Link>

              <Link
                to="/users"
                className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ${isActive('/users')}`}
              >
                Người dùng
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Mở menu</span>
              {/* Icon for menu - you can replace with your own icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 ${isActive('/')}`}
          >
            Trang chủ
          </Link>

          <Link
            to="/transactions"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 ${isActive('/transactions')}`}
          >
            Giao dịch
          </Link>

          <Link
            to="/categories"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 ${isActive('/categories')}`}
          >
            Danh mục
          </Link>

          <Link
            to="/reports"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 ${isActive('/reports')}`}
          >
            Báo cáo
          </Link>

          <Link
            to="/users"
            className={`block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 ${isActive('/users')}`}
          >
            Người dùng
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav; 