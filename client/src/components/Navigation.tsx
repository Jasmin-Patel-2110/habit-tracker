import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navigation: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleMenuToggle = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              onClick={closeMenu}
            >
              Habit Tracker
            </Link>
          </div>
          {/* Hamburger for mobile */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={handleMenuToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/create"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Create
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/login"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/register"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
                  }`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
          </div>
          {/* Date (always visible) and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
            <span className="text-sm text-gray-500 dark:text-gray-300">
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.03 4.22a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.03a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.03-4.22a1 1 0 00-1.42-1.42l-.7.7a1 1 0 001.42 1.42l.7-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden flex flex-col space-y-2 pb-4 animate-fade-in bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/dashboard"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Dashboard
            </Link>
            <Link
              to="/create"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === "/create"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
              }`}
              onClick={closeMenu}
            >
              Create
            </Link>
            {isLoggedIn ? (
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 hover:bg-red-200 hover:text-red-800 dark:hover:bg-red-800 dark:hover:text-red-100 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/login"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
                  }`}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === "/register"
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                      : "text-gray-600 dark:text-gray-200 hover:text-gray-900 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-800"
                  }`}
                  onClick={closeMenu}
                >
                  Register
                </Link>
              </>
            )}
            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-gray-500 dark:text-gray-300">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 100 2h-1a1 1 0 100-2h1zm-2.03 4.22a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4.22-2.03a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM4 11a1 1 0 100-2H3a1 1 0 100 2h1zm2.03-4.22a1 1 0 00-1.42-1.42l-.7.7a1 1 0 001.42 1.42l.7-.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
