import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchOrder from '../features/order/SearchOrder';
import UserInfo from '../features/user/UserInfo';
import LinkButton from './LinkButton';
import { useDarkMode } from '../features/darkMode/hook/useDarkMode';
import { DarkModeToggle } from '../features/darkMode/components/DarkModeToggle';

/**
 * Header Component
 *
 * Main navigation header with responsive design, cart functionality,
 * and dark mode support. Includes mobile menu for smaller screens.
 */
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart?.cart || []);
  const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const { isDarkMode } = useDarkMode();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`border-b shadow-lg transition-colors duration-200 ${
        isDarkMode ? 'dark border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <LinkButton type="logo" to="/" className="text-xl font-bold tracking-wide lg:text-2xl">
              FAST REACT PIZZA CO
            </LinkButton>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 lg:flex">
            <LinkButton
              type="nav"
              to="/menu"
              className="rounded-md px-3 py-2 font-medium transition-colors duration-200"
            >
              Menu
            </LinkButton>
            <LinkButton
              type="nav"
              to="/order/new"
              className="rounded-md px-3 py-2 font-medium transition-colors duration-200"
            >
              Order Pizzas
            </LinkButton>
            <LinkButton
              type="cart"
              to="/cart"
              className="rounded-md px-4 py-2 font-medium text-white transition-colors duration-200"
            >
              <span className="relative">
                🛒
                {itemCount > 0 && (
                  <span
                    className={`absolute bottom-2 left-5 rounded-full px-1 py-0.5 text-[10px] font-bold ${
                      isDarkMode ? 'bg-gray-800 text-blue-300' : 'bg-white text-yellow-600'
                    }`}
                  >
                    {itemCount}
                  </span>
                )}
              </span>
            </LinkButton>
          </nav>

          {/* Desktop Search, User Info, and Dark Mode Toggle */}
          <div className="hidden items-center space-x-4 lg:flex">
            <SearchOrder />
            <UserInfo />
            <DarkModeToggle />
          </div>

          {/* Mobile menu button and dark mode toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <DarkModeToggle className="mr-2" />
            <button
              onClick={toggleMenu}
              className={`rounded-md p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDarkMode
                  ? 'text-gray-300 hover:bg-gray-800 hover:text-blue-400 focus:text-blue-400 focus:ring-blue-500'
                  : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 focus:text-yellow-600 focus:ring-yellow-500'
              }`}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div
              className={`space-y-1 border-t px-2 pb-3 pt-2 shadow-lg transition-colors duration-200 ${
                isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
              }`}
            >
              <LinkButton
                type="mobile-nav"
                to="/menu"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-md px-3 py-2 text-left font-medium transition-colors duration-200"
              >
                Menu
              </LinkButton>
              <LinkButton
                type="mobile-nav"
                to="/order/new"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-md px-3 py-2 text-left font-medium transition-colors duration-200"
              >
                Order Pizzas
              </LinkButton>
              <LinkButton
                type="mobile-cart"
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full rounded-md px-3 py-2 text-left font-medium text-white transition-colors duration-200"
              >
                <span className="flex items-center justify-between">
                  <span>Cart</span>
                  <span className="text-sm">({itemCount} items)</span>
                </span>
              </LinkButton>

              {/* Mobile Search and User Info */}
              <div className={`space-y-3 border-t pt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="px-3">
                  <SearchOrder />
                </div>
                <div className="px-3">
                  <UserInfo />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
