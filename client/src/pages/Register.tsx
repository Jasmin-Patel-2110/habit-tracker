import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import { useTheme } from "../context/ThemeContext";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const token = await register(email, password);
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Email may already be in use.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-2 sm:px-0">
      <div className="relative w-full max-w-xs sm:max-w-md">
        <button
          onClick={toggleTheme}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10"
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
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-4 sm:p-8 rounded-lg shadow-md w-full"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-900 dark:text-gray-100">
            Register
          </h2>
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-200 mb-2 sm:mb-4 text-sm font-medium p-2">
              {error}
            </div>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-3 sm:mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-sm"
          >
            Register
          </button>
          <div className="mt-3 sm:mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </a>
          </div>
        </form>
        <div className="mt-2 text-center text-sm">
          <a
            href="/"
            className="text-gray-500 dark:text-gray-300 hover:underline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
